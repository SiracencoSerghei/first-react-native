import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();

export const setStorage = async ({ folder, creationTime, file }) => {
  const snapshot = await uploadBytes(
    ref(storage, `${folder}/${creationTime}.jpg`),
    file
  );
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
