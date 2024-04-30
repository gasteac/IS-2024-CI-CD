import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="flex flex-col gap-4 max-w-80 ">
        <h1>Sign Up...</h1>
       
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            className="grow"
            placeholder="harry@elpotter.com"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password:
          <input type="password" className="grow" placeholder="*****" />
        </label>
        <button className="btn">Sign Up</button>
        <h2 className="self-end">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-emerald-700 cursor-pointer hover:text-opacity-60"
          >
            Sign In...
          </span>
        </h2>
      </div>
    </div>
  );
};
