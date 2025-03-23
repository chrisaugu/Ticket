import React from 'react';
import ReactDOM from 'react-dom';
import Icon from "./Icon";

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className={`modal ${isShowing ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card scale-up-center">

        <header className="modal-card-head has-text-centered">
          <Icon className="has-fill-primary is-size-4" icon="today"/>
          <div className="modal-card-title">Help</div>
          <button className="delete is-large" aria-label="close" onClick={hide}/>
          {/*<button type="button" className="delete is-large" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>*/}
        </header>
        
        <section className="modal-card-body">
          {/*<h3 className="title">Help</h3>*/}
          <p className="subtitle">How Import Data</p>
          <p>
            1. Create a CSV Excel file with the following headings: <br/>
            <code><small><b>TicketNo</b></small>, <small><b>TicketStatus</b></small>, <small><b>TicketPrice</b></small>, <small><b>TicketPattern</b></small></code>
          </p>
          <p>
            2. Enter all the data and save.
          </p>
          <p>
            2. Import the CSV file.
          </p>

        </section>
      </div>
    </div>

  </React.Fragment>, document.body
) : null;


// Modal.propTypes = {
//     isVisible: PropTypes.bool,
//     onDismiss: PropTypes.func.isRequired,
//     children: PropTypes.any.isRequired, // eslint-disable-line
//     height: PropTypes.number,
//     width: PropTypes.number,
// }

// Modal.defaultProps = {
//     isVisible: false,
//     height: 250,
//     width: 250,
// }


export default Modal;