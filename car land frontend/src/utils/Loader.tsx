import React, { Fragment, useState, CSSProperties, ChangeEvent } from "react";
import { RingLoader } from "react-spinners";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
const Loader = () => {
  return (
    <Fragment>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <RingLoader color={"hsl(8, 0%, 40%)"} cssOverride={override} />
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;
