import { useSignup } from "../hooks/useSignup";
import { useRef } from "react";
import video from "../video/olovli.mp4";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
function Signup() {
  const displayName = useRef();
  const email = useRef();
  const password = useRef();
  const photoUrl = useRef();
  const { signUpWithGoogleProvider, signup } = useSignup();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signUpWithGoogleProvider();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(
      displayName.current.value,
      email.current.value,
      password.current.value,
      photoUrl.current.value
    );
  };

  return (
    <div className="h-screen grid  place-items-center">
      <video
        className="w-full h-[630px] object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className=" bg-slate-500 py-2 px-10 rounded-lg absolute">
        <h1 className="text-3xl font-bold mb-5 text-center text-white">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-3">
            <label className="mr-5 text-white" htmlFor="username">
              Name:{" "}
            </label>
            <input
              ref={displayName}
              type="text"
              placeholder="Enter your user name"
              id="username"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-3">
            <label className="mr-5 text-white" htmlFor="photoUrl">
              Photo Url:
            </label>
            <input
              ref={photoUrl}
              type="url"
              id="photoUrl"
              placeholder="Enter your url"
              className="input input-bordered  w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-3">
            <label className="mr-5 text-white" htmlFor="email">
              Email:{" "}
            </label>
            <input
              ref={email}
              type="email"
              placeholder="Enter your email"
              id="email"
              className="input input-bordered  w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-7">
            <label className="mr-5 text-white" htmlFor="password">
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input input-bordered  w-full max-w-xs"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn btn-primary btn-sm md:btn-md">
              Sign Up
            </button>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-sm md:btn-md btn-white ">
              <FcGoogle className="w-6 h-6" /> Google
            </button>
            <Link className="btn mb-6 btn-sm md:btn-md" to="/login">
              Are you already an accaunt ?{" "}
              <span className="font-bold link text-primary ">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
