import { Card, Button } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

export default function InfoCard({ user, place }) {
  const [liked, setLiked] = useState("");

  /**
   * get info from db for favorites
   */
  const getUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const favorites = docSnap.data().favorites;
      // check if place is in favorites
      if (favorites.includes(place.name)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.error("No such document!");
    }
  };

  /**
   * Add and Removes places from Favorites list in User data
   */
  const handleLikeClick = async () => {
    const docRef = doc(db, "users", user.uid);
    if (liked) {
      // Atomically remove a region from the "regions" array field.
      await updateDoc(docRef, {
        favorites: arrayRemove(place.name),
      });
      setLiked(false);
    } else {
      // Atomically add a new favorite to the "favorites" array field.
      await updateDoc(docRef, {
        favorites: arrayUnion(place.name),
      });
      setLiked(true);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 240,
        gap: 2,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <div style={{ width: "100%" }}>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5} style={{cursor: "default"}}>
          {place.name}
        </Typography>

        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            style={{textDecoration: "none", color: "gray"}}
            href={`http://maps.google.com/?q=${place.vicinity}`}
          >
            {place.vicinity}
          </Link>
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            <Link
            style={{textDecoration: "none", color: "purple", cursor: "default"}}
              href=""
            >
              &#9734; {place.rating} / 5
            </Link>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="sm"
            onClick={handleLikeClick}
          >
            {liked ? "\u2665" : "\u2661"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
