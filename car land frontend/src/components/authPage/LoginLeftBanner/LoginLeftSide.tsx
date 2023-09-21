import React, { ReactElement } from "react";

interface IPROPS {
  value: {
    Auth: ReactElement;
  };
}
export const LoginLeftSide: React.FC<IPROPS> = ({ value }) => {
  const AuthComponent = value.Auth;

  return (
    <>
      <div className="relative overflow-x-hidden bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-end xl:flex-row">
            {AuthComponent}
          </div>
        </div>
      </div>
    </>
  );
};
