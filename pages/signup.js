import * as React from "react";
import { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const containerStyle = {
  width: 300,
  mx: "auto", // margin left & right
  my: 4, // margin top & bottom
  py: 3, // padding top & bottom
  px: 2, // padding left & right
  display: "flex",
  flexDirection: "column",
  gap: 2,
  borderRadius: "sm",
  boxShadow: "md",
};

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const db = getFirestore();

  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeHandlerPassword = (p) => {
    setPassword(p.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const auth = getAuth();

    try {
      // Create Authenticated User: email, password
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create User object
      const userObj = {
        uid: user.uid,
        email: user.email, // user's email
        displayName: user.displayName || "",
        image: user.photoURL || "", // user's picture link
        bio: `Hey, I'm new here!`, // user's bio
        favorites: [], // list of favorite places (places id)
        wantToGo: [], // list of want to go places (places id)
        friends: [], // list of friends (favorite places can be linked by friend id)
      };

      // Add userObj in DB 'users' table
      await setDoc(doc(db, "users", user.uid), userObj);

      router.push("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleLoginRedirect = () => {
    return router.push("/login");
  };

  return (
    <CssVarsProvider>
      <Sheet sx={containerStyle} variant="outlined">
        <div style={{ textAlign: "center" }}>
          <Typography level="h4" component="h1">
            FridayFinder
          </Typography>
          <Typography level="body2">Sign Up</Typography>
        </div>
        <ModeToggle />

        <form onSubmit={handleSignup}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="user@mail.com"
              onChange={onChangeHandlerEmail}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={onChangeHandlerPassword}
            />
          </FormControl>

          <Button type="submit" sx={{ mt: 1, width: "100%" }}>
            Sign Up
          </Button>
        </form>

        <Typography
          fontSize="sm"
          sx={{ alignSelf: "center" }}
          endDecorator={<Link onClick={handleLoginRedirect}>Log In</Link>}
        >
          Have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}

{
  /* Dark/Light mode for Login component */
}
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}
