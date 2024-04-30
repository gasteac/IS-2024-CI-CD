export const Home = () => {
  return (
    <div className="flex items-center flex-col justify-center h-screen w-screen">
      <h1 className="text-5xl">
        Welcome <span className="text-emerald-600 font-semibold">USERNAME</span>
      </h1>
      <span className="text-3xl mt-12 text-red-500 font-semibold cursor-pointer hover:text-red-600 hover:scale-[1.1] transition-all ease-in duration-[60ms]">
        Logout
      </span>
    </div>
  );
};
