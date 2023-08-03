import { db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

// get the contents of our user in the database
export default async function handler(req, res) {
  const { uid } = req.body;
  const cleanedUID = uid.replace(/"/g, "");

  try {
    const usersRef = doc(db, "users", cleanedUID);
    const docSnap = await getDoc(usersRef);
    const retrievedData = docSnap.data();

    return res
      .status(200)
      .json({
        data: retrievedData,
        message: "Data retrieved, must be parsed now",
        ok: 200,
      });
  } catch (error) {
    return res.status(401).json({ message: "Data not retrieved. FAILED" });
  }
}
