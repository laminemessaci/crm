import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color, width, height }) => {
  return (
    <main className="flex items-center justify-center w-full sm:w-2/5 mx-auto h-screen ">
      <ReactLoading type={type} color={color} width={width} height={height} />
    </main>
  );
};

export default Loader;
