import { doc, setDoc } from "firebase/firestore"; 
import { db } from "./config"; 


export const setUser = async ({ email, url, login, uid}) => {
    try {
        await setDoc(doc(db, "user", uid), {
            login,
            email,
            url
          });
        
    } catch (error) {
        
    }
};


// // Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

