import { Component, Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

const Toast = ({ text, variant, isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <Fragment>
    <div className={`modal has-noti ${isShowing ? 'is-active':''}`}>
      <div className={`message ${variant ? 'is-'+variant:''}`}>
        {text}
      </div>  
    </div>
  </Fragment>, document.body
) : null;

export default Toast;


class Toastx extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
    };
  }
  
  componentDidMount() {
    this.setInterval(() => {
      this.setState({
        number: this.state.number + 1
      });
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.counterInterval);
  }

  componentWillMount() {}
  componentWillReceiveProps() {}
  shouldComponentUpdate() {}
  componentWillUpdate() {}
  componentDidUpdate() {}

  render() {
    return (
      <p>{this.state.number} seconds have passed</p>
    );
  }

}