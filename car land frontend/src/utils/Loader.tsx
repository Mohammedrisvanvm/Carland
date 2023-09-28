import React,{Fragment,useState,CSSProperties, ChangeEvent } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const Loader = () => {
    let [loading, setLoading] = useState<boolean>(true);
    let [color, setColor] = useState<string>("#ffffff");
  return (
   <Fragment>

<div className="sweet-loading">
      <button onClick={(event: React.MouseEvent<HTMLElement>) => setLoading(!loading)}>Toggle Loader</button>
      <input value={color} onChange={(input:ChangeEvent<HTMLInputElement>) => setColor(input.target.value)} placeholder="Color of the loader" />

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>


   </Fragment>
  )
}

export default Loader
