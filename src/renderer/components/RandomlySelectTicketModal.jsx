import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: this.props.tickets,
      selectedTicket: 0,
    };

    this.sleep = this.sleep.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate")
    // this.randomize();
  }

  componentWillUpdate() {
    // console.log("componentWillUpdate")
  }

  componentDidMount() {
    // console.log("componentDidMount")
  }

  randomize() {
    console.log("Randomizing...");
    let tickets_count = this.state.tickets.length;

    const min = 1;
    const max = tickets_count;
    const rand = Math.floor(min + Math.random() * (max - min));
    // var rand = Math.floor(Math.random() * tickets_count) + 1; // returns a random interger from 1 to 500;
    if (rand > tickets_count) {
      console.log("Out of range. randomize again");
    }
    // console.log(rand);
    // console.log(this.state.tickets[rand].ticket_no);
    // ticketsList.moveTo(rand);
    // console.log(ticketsList.getElement());
    // setSelectedTicket(ticketsList.getElement());
    // setSelectedTicket(this.state.tickets[rand].ticket_no);
    this.setState({ selectedTicket: this.state.tickets[rand].ticket_no });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  render() {
    let selected_ticket = this.props.selectedTicket;
    let isShowing = this.props.isShowing;
    let hide = this.props.hide;

    // console.log("render")

    return isShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <div className={`${isShowing ? "modal is-active" : "modal"}`}>
              <div className="modal-background has-background-white"></div>
              <div className="modal-content has-text-centered">
                <h1 className="title">{selected_ticket}</h1>
                {/*<!-- <div className="title is-spaced is-1 is-size-1-mobile has-text-centered"></div> -->*/}
                {/*<!-- <div className="subtitle is-5 is-size-6-mobile">This opens just by adding the <code>is-active</code> to the modal div.</div> -->*/}
                <hr />
                {/*<!-- <span className="tag has-text-grey">Use the button on the top right corner to close.</span> -->
						<!-- <p>Confetti Js Effect 🎇</p> -->*/}
              </div>

              <button
                className="modal-close is-large"
                aria-label="close"
                onClick={hide}
              ></button>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  }
}

export default Modal;
