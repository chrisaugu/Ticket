import React from "react";
import Modal from "../components/Modal";

const useModal = () => {
  const [isShowing, setIsShowing] = React.useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  // return {
  //   isShowing,
  //   toggle,
  // }

  return <Modal />;
};

export default useModal;
