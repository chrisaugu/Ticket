import { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

const Toast = ({ isShowing, hide, text }) => isShowing ? ReactDOM.createPortal(
  <Fragment>
    <div className={`modal has-noti ${isShowing ? 'is-active':''}`}>
      <div className="message">
        {text}
      </div>  
    </div>
  </Fragment>, document.body
) : null;

export default Toast;