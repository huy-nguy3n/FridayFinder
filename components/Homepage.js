import * as React from "react";
import GoogleMap from "./GoogleMap";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import Person from "@mui/icons-material/Person";
import Menu from "@mui/joy/Menu";
import Stack from "@mui/joy/Stack";
import MenuItem from "@mui/joy/MenuItem";
import Button from "@mui/joy/Button";
import { Typography } from "@mui/joy";

const Homepage = ({ user }) => {
  const router = useRouter();
  const auth = getAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /**
   * Sign out user
   * @param {*} event
   */
  const handleSignOut = (event) => {
    if (event.cancelable) event.preventDefault();
    signOut(auth);

    // Clear user session data from the browser
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("firebaseAuth"); // Clear localStorage
      window.sessionStorage.removeItem("firebaseAuth"); // Clear sessionStorage
    }

    router.push("/login");
  };

  /**
   * Redirect to '/profile'
   * @param {*} event
   */
  const handleProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push({
      pathname: "/profile",
      query: { user: JSON.stringify(user) },
    });
  };

  /**
   * Open drop down menu for profile and signout
   * @param {*} event
   */
  const handleOpenDropdown = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    setAnchorEl(event.currentTarget);
  };

  /**
   * Close drop down menu
   */
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Image
          src="/../public/images/ff-logo.png"
          alt="Logo"
          width={70}
          height={35}
          priority={true}
        />

        {/* Dropdown menu for account related options */}
        <div style={{ display: "flex", marginleft: "auto" }}>
          <Button
            id="account-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpenDropdown}
          >
            <Person />
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseDropdown}
            aria-labelledby="account-button"
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Stack>

      <GoogleMap user={user} />
    </div>
  );
};

export default Homepage;
