import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ login, email, password, avatar }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;  // user id
      let url = null;
      if (avatar) {
        const response = await fetch(avatar);
        const file = await response.blob();
        const { creationTime } = await MediaLibrary.createAssetAsync(avatar);
        url = await setStorage({ folder: "avatar", creationTime, file });
      }
      await registerUser({ login, email, url, uid }); // set user in firebase

      const data = await getUserData(uid);
      return { ...data, uid };
    } catch (error) {
      console.log('register ',error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);