import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../features/user/userSlice";

export function useSignup() {
  const dispatch = useDispatch();

  const signup = (displayName, email, password, photoURL) => {
    createUserWithEmailAndPassword(auth, email, password, photoURL)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
        toast.success(`Welcome ${displayName}!`);
        dispatch(userCredential.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const signUpWithGoogleProvider = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        dispatch(login(user));
        toast.success(`Welcome ${user.displayName} !`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  return { signUpWithGoogleProvider, signup };
}
