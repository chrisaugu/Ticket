import React, { useState } from "react";
import Toast from "../components/Toast";

const useToast = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  // return {
  //   isShowing,
  //   toggle,
  // }

  return <Toast />;
};

export default useToast;
