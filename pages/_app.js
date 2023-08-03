import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CssVarsProvider } from "@mui/joy/styles";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth(firebase);
  const [user, setUser] = useState(null);

  // Check if user is logged in the browser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // if (user) => '/', else => '/login'
      if (authUser) {
        setUser(authUser);
        router.push("/");
      } else {
        setUser(null);
        router.push("/login");
      }
    });
    
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CssVarsProvider>
      <Component {...pageProps} router={router} user={user} />
    </CssVarsProvider>
  );
}
