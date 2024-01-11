import React, { ReactElement } from "react";
import { UserFooter } from "../../userFooter/userFooter";
import { useLocation, useNavigate } from "react-router";

interface IPROPS {
  value: {
    Auth: ReactElement;
  };
}

export const LoginLeftSide: React.FC<IPROPS> = ({ value }) => {
  const AuthComponent = value.Auth;
  const Navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className="relative overflow-x-hidden bg-opacity-75 ">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
          <div className="mb-5 ml-2  sm:mb-0">
            {location.pathname !== "/userauth" ? (
              <div>
                <button
                  title="go back"
                  className="rounded-full bg-slate-100 h-10 w-10 flex items-center justify-center -translate-x-1"
                  onClick={() => Navigate(-1)}
                >
                  <span className="text-2xl "> &larr;</span>
                </button>{" "}
              </div>
            ) : (
              <div>
                <button
                  title="Home"
                  className="rounded-full bg-slate-100 h-10 w-10 flex items-center justify-center -translate-x-1"
                  onClick={() => Navigate("/")}
                >
                  <span className="text-2xl ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"></path>
                    </svg>
                  </span>
                </button>{" "}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-end xl:flex-row">
            {AuthComponent}
          </div>
        </div>
        <UserFooter />
      </div>
    </>
  );
};
