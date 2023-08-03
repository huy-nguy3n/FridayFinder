import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/joy";
import InfoCard from "./InfoCard";

export default function GoogleMap({ user }) {
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [searchButtonLoading, setSearchButtonLoading] = useState(false);

  // default: San Francisco
  const defLocation = {
    lat: 37.7749,
    lng: -122.4194,
  };

  /**
   * Nearby results: place markers, heatmap
   * @param {*} results
   * @param {*} status
   * @param {*} pagination
   */
  function nearbyResults(results, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // display heatmap
      getHeatmapData(results);

      // display markers
      for (let result of results) {
        createResultsMarker(result);
      }

      // Check if more results are available
      if (pagination.hasNextPage) {
        // Fetch the next page of results
        pagination.nextPage();
      }
    }
  }

  /**
   * Create Marker for current location
   * @param {*} location
   * @returns
   */
  function createCurrentMarker(location) {
    return new google.maps.Marker({
      position: location,
      map: mapRef.current,
    });
  }

  /**
   * Create Marker for Place
   * @param {*} place
   * @returns
   */
  function createResultsMarker(place) {
    const customIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "#f58540",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeOpacity: 1,
      strokeWeight: 2,
      scale: 5,
    };

    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: mapRef.current,
      icon: customIcon,
      title: place.name,
    });

    // InfoCard: Details of Place
    // Open InfoCard of Place
    marker.addListener("click", () => {
      // Set the clicked place as the new map center
      setSelectedPlace(place);
      mapRef.current.panTo(place.geometry.location);
    });

    // Close the InfoCard when map is clicked
    mapRef.current?.addListener("click", () => {
      setSelectedPlace(null);
    });

    return marker;
  }

  /**
   * Add Nearby Results locations for heatmap
   * @param {*} results
   */
  function getHeatmapData(results) {
    const data = results.map((result) => {
      const lat = result.geometry.location.lat();
      const lng = result.geometry.location.lng();

      return {
        location: new google.maps.LatLng(lat, lng),
        weight: Math.random() * 10, // You can set the weight based on your data
      };
    });

    if (mapRef.current) {
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: data,
      });

      // Set heatmap overlay
      heatmap.setMap(mapRef.current);

      // change color and intensity of heatmap
      const gradient = [
        "rgba(0, 0, 255, 0)",
        "rgba(30, 144, 255, 1)",
        "rgba(70, 130, 180, 1)",
        "rgba(119, 136, 153, 1)",
        "rgba(169, 121, 126, 1)",
        "rgba(219, 107, 102, 1)",
        "rgba(239, 89, 89, 1)",
        "rgba(255, 0, 0, 1)",
      ];
      heatmap.set("gradient", gradient);
      heatmap.set("radius", 35);
    }
  }

  /**
   * "Search This Area" button
   */
  function handleSearchThisArea() {
    setSearchButtonLoading(true);

    // Get the bounds of the current visible area on the map
    const bounds = mapRef.current.getBounds();
    const location = mapRef.current.getCenter();

    // Create a new request with the bounds and location
    const request = {
      bounds: bounds,
      location: location,
      keyword: "restaurants, food, attractions, nightlife, open now",
    };

    // Perform the search request
    let service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(request, nearbyResults);
    setSearchButtonLoading(false);
    setShowSearchButton(false);
  }

  useEffect(() => {
    // Google Map
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
      version: "weekly",
      libraries: ["places", "visualization"],
    });

    loader.load().then(async () => {
      const { google } = window;
      const { Map } = await google.maps.importLibrary("maps");

      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Create a new map centered on the user's current location
          mapRef.current = new Map(mapRef.current, {
            center: currentLocation,
            zoom: 12,
            mapTypeControl: false,
            fullscreenControl: false,
          });

          // Add event listeners for map drag events
          mapRef.current.addListener("dragstart", () =>
            setShowSearchButton(false)
          );
          mapRef.current.addListener("dragend", () =>
            setShowSearchButton(true)
          );

          // Add a marker for the user's current location
          createCurrentMarker(currentLocation);

          // Create Heatmap overlay in nearby area
          const request = {
            location: currentLocation,
            radius: "8000",
            keyword:
              "restaurants, food, attractions, night life nearby open now",
          };

          let service = new google.maps.places.PlacesService(mapRef.current);
          service.nearbySearch(request, nearbyResults);
        });
      } else {
        // Create a new map centered on the default location
        mapRef.current = new Map(mapRef.current, {
          center: { lat: defLocation.lat, lng: defLocation.lng },
          zoom: 13,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative", height: "94vh" }}>
      <Button loading loadingPosition="start">
        Loading...
      </Button>
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        {showSearchButton && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1,
            }}
          >
            <Button
              onClick={handleSearchThisArea}
              disabled={searchButtonLoading}
              loading={searchButtonLoading}
            >
              Search This Area
            </Button>
          </div>
        )}
      </div>
      {selectedPlace ? (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            width: "300px",
          }}
        >
          <InfoCard user={user} place={selectedPlace} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
