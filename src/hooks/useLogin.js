import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

export function useLogin() {
  const dispatch = useDispatch();

  // login with email and password
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Welcome Comeback!");
        dispatch(login(userCredential.user));
      })
      .catch((error) => {
        const match = error.message.match(/\/([^)]+)/);
        if (match) {
          const extracted_text = match[1];
          console.log(extracted_text);
        }
      });
  };

  return { login };
}
