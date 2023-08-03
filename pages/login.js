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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {firebase} from "../firebase";
import { useRouter } from "next/router";

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

  // Handle Field changes as user types
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  // login user
  const handleLogin = async (event) => {
    event.preventDefault();
    const auth = getAuth(firebase);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      router.push({
        pathname: "/",
        query: { user: JSON.stringify(user) },
      });
    } catch (error) {
      console.error(error);
      alert("Incorrect Email or Password");
    }
  };

  // redirect to '/signup'
  const handleSignUpRedirect = () => {
    router.push("/signup");
  };

  return (
    <CssVarsProvider>
      <Sheet sx={containerStyle} variant="outlined">
        <div style={{ textAlign: "center" }}>
          <Typography level="h4" component="h1">
            FridayFinder
          </Typography>
          <Typography level="body2">Sign In</Typography>
        </div>

        <ModeToggle />

        <form onSubmit={handleLogin}>
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
            Log In
          </Button>
        </form>

        <Typography
          fontSize="sm"
          sx={{ alignSelf: "center" }}
          endDecorator={<Link onClick={handleSignUpRedirect}>Sign Up</Link>}
        >
          Don&apos;t have an account?
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
