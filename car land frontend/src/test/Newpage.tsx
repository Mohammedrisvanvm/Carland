import React from "react";
import NewNav from "./NewNav";
import NewSide from "./NewSide";
import Data from "./Data";

const Newpage = () => {
  const [sidebarWidth, setsidebarWidth] = React.useState<boolean>(true);
  const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
  return (
    <>
      <NewNav
        setSpanVisible={setSpanVisible}
        sidebarWidth={sidebarWidth}
        spanVisible={spanVisible}
        setsidebarWidth={setsidebarWidth}
      />
      <NewSide spanVisible={spanVisible} />
      <Data sidebarWidth={sidebarWidth} />
    </>
  );
};

export default Newpage;
