import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();

export const setAvatarStorage = async ({ avatar, uid }) => {
  const userAvatarRef = ref(storage, `avatar/${uid}.jpg`);
  const snapshot = await uploadBytes(userAvatarRef, avatar);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
//   console.log(snapshot);
// });

// For instance, get the download URL: https://firebasestorage.googleapis.com/...

// getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     console.log('File available at', downloadURL);
//   });
