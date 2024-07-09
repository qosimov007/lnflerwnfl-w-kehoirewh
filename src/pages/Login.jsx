import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useRef } from "react";
import video from "../video/olovli.mp4";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
function Login() {
  const { signUpWithGoogleProvider } = useSignup();
  const { login } = useLogin();

  const email = useRef();
  const password = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.current.value, password.current.value);
  };

  return (
    <div className="h-screen grid place-items-center top-0">
      <video
        className="w-full h-screen object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="bg-slate-500 py-10 px-10 rounded-lg absolute">
        <h1 className="text-3xl text-white font-bold mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-5">
            <label className="mr-5 text-white" htmlFor="email">
              Email:{" "}
            </label>
            <input
              ref={email}
              type="text"
              placeholder="Enter your email...  "
              id="email"
              className="input input-bordered  w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-5">
            <label className="mr-5 text-white" htmlFor="password">
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Enter your password..."
              className="input input-bordered  w-full max-w-xs"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn btn-primary btn-sm md:btn-md">Login</button>
            <button
              type="button"
              onClick={signUpWithGoogleProvider}
              className="btn btn-sm  md:btn-md btn-white">
              <FcGoogle className="w-6 h-6" /> Google
            </button>
            <Link className="btn btn-sm md:btn-md " to="/signup">
              If you don't have any account?{" "}
              <span className="font-bold text-primary link ">Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
