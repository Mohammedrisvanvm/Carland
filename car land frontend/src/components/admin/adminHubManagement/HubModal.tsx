import React, { Dispatch, Fragment, SetStateAction ,ReactNode} from "react";

type Iprops = {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children?:ReactNode
};

const HubModal = ({ isVisible, setVisible,children }: Iprops) => {
  if (!isVisible) return null;
  return (
    <Fragment>
      <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
        <div className="w-4/6 h-14 flex flex-col">
          <button className="text-white text-xl place-self-end" onClick={()=>setVisible(false)}>x</button>
          <div className="bg-white p-2 rounded">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default HubModal;
