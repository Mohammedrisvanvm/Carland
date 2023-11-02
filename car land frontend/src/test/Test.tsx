import React, { FC, MutableRefObject } from "react";
import { useReactToPrint } from "react-to-print";
type prop = {
  print: React.MutableRefObject<HTMLDivElement | null>;
};
const Test: FC<prop> = ({ print }) => {
  const [removedInnerDiv, setRemovedInnerDiv] = React.useState<Element | null>(
    null
  );
  console.log("hi");

  const generatePdf = useReactToPrint({
    content: () => print.current,
    documentTitle: "Sales Report",
    onAfterPrint: () => alert("data saved in pdf"),
  });
  const removeInnerDiv = () => {
    if (print.current) {
      const innerDiv = print.current.querySelector(".removediv");
      if (innerDiv) {
        innerDiv.remove();
        generatePdf();
      }
    }
  };
  return (
    <>
      <button
        onClick={() => removeInnerDiv()}
        className=" px-3  py-1 rounded-xl text-white flex "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 125"
          className="h-10 w-10"
        >
          <title> PDF</title>
          <g data-name="Layer 26">
            <path d="M81.57,6H48.64V35.07a1,1,0,0,1-1,1H18.57V54h63Z" />
            <rect x="18.57" y="88.64" width="63" height="7.47" />
            <polygon points="46.64 7.41 33.31 20.74 19.98 34.07 46.64 34.07 46.64 7.41" />
            <path d="M85.57,56H14.43A3.44,3.44,0,0,0,11,59.43V83.21a3.44,3.44,0,0,0,3.43,3.43H85.57A3.44,3.44,0,0,0,89,83.21V59.43A3.44,3.44,0,0,0,85.57,56ZM35.46,74H32.61v6a1,1,0,0,1-1,1H29.38a1,1,0,0,1-1-1V62.62a1,1,0,0,1,1-1h6.08c4.31,0,6.69,2.19,6.69,6.18S39.77,74,35.46,74ZM50.3,81H44.52a1,1,0,0,1-1-1V62.62a1,1,0,0,1,1-1H50.3c6.24,0,9.67,3.45,9.67,9.71S56.63,81,50.3,81Zm24-16.39a1,1,0,0,1-1,1H66v4h6.15a1,1,0,0,1,1,1v2a1,1,0,0,1-1,1H66V80a1,1,0,0,1-1,1H62.78a1,1,0,0,1-1-1V62.62a1,1,0,0,1,1-1H73.31a1,1,0,0,1,1,1Z" />
            <path d="M55.68,71.33c0-2.06-.45-3.56-1.36-4.47a5.41,5.41,0,0,0-4-1.29H47.75V77.05H50.3C54.05,77.05,55.66,75.34,55.68,71.33Z" />
            <path d="M37.88,67.79c0-1.64-.64-2.22-2.42-2.22H32.61V70h2.85C37.45,70,37.86,69.11,37.88,67.79Z" />
          </g>
        </svg>
      </button>
    </>
  );
};

export default Test;
