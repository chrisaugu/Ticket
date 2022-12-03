import React from 'react';
import ReactDOM from 'react-dom';

import Ticket from "../scripts/Ticket";
import Icon from "./Icon";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ticketCount: 0,
			ticketPattern: "",
			ticketsList: [],
			ticketPrice: 0
		}

		this.handle = this.handle.bind(this);
		this.handleTicketCountChange = this.handleTicketCountChange.bind(this);
		this.handleTicketPatternChange = this.handleTicketPatternChange.bind(this);
		this.handleTicketPriceChange = this.handleTicketPriceChange.bind(this);
	}

	componentDidMount() {
		let $ticket_no = React.createRef();
		let $ticket_pattern = React.createRef();
		let $ticket_price = React.createRef();

		// $ticket_no.current.focus();	
	}
	
	handle() {
		let ticketsList = [];

		for (var i = 0; i < this.state.ticketCount; i++) {
			if (i >= 100 && i < 1000) {
				ticketsList.push(new Ticket(
					i+1,
					`${this.state.ticketPattern}${i+1}`,
					// `${this.state.ticketPattern}${i+1}`,
					`CHECKED OUT`,
					this.state.ticketPrice
				));
			}
			if (i >= 10 && i < 100) {
				ticketsList.push(new Ticket(
					i+1,
					`${this.state.ticketPattern}0${i+1}`,
					// `${this.state.ticketPattern}0${i+1}`,
					`CHECKED OUT`,
					this.state.ticketPrice
				));
			}
			if (i >= 0 && i < 10) {
				ticketsList.push(new Ticket(
					i+1,
					`${this.state.ticketPattern}00${i+1}`,
					// `${this.state.ticketPattern}00${i}`,
					`CHECKED OUT`,
					this.state.ticketPrice
				));
			}
		}

		this.props.handleNewTickets(ticketsList)
	}

	handleTicketCountChange(e){
		this.setState({ticketCount: e.target.value});
	}

	/**
	 * Handles the onChange event for ticket pattern
	 */
	handleTicketPatternChange(e) {
		let pattern = e.target.value;

		if (pattern.search(new RegExp('X'))) {
			this.setState({ticketPattern: pattern.split('X').join('')});	
		}
		else if (pattern.search(new RegExp('x'))) {
			this.setState({ticketPattern: pattern.split('x').join('')});	
		}
		else {
			this.setState({ticketPattern: pattern});	
		}
	}

	handleTicketPriceChange(e) {
		let price = e.target.value;
		this.setState({ticketPrice: price});
	}

	render() {
		let isShowing = this.props.isShowing;
		let hide = this.props.hide;

		return isShowing ? ReactDOM.createPortal(
			<React.Fragment>
				<div className={`modal ${isShowing ? 'is-active':''}`}>
					<div className="modal-background"></div>
					<div className="modal-card scale-up-center">

						<header className="modal-card-head">
							<Icon className="has-fill-primary is-size-4" icon="today"/>
							<div className="modal-card-title">
								Generate Tickets Number
							</div>
							{/*<button className="delete is-large" aria-label="close" onClick={hide}/>*/}
						</header>
						
						<section className="modal-card-body has-text-centered">
							{/*<h3 className="title">Generate ticket</h3>*/}
							{/*<p className="subtitle">hello</p>*/}

							<form>
								<input type="number" className="input" name="ticket_no" placeholder="Number of ticket to generate" onChange={this.handleTicketCountChange} />
								<hr/>
								<input type="text" className="input" name="ticket_pattern" placeholder="Ticket pattern e.g. MCSxxxx, ISxxx; where x is for number" onChange={this.handleTicketPatternChange} />
								<hr/>
								<input type="text" className="input" name="ticket_price" placeholder="Ticket price" onChange={this.handleTicketPriceChange} />
							</form>

						</section>

						<footer className="modal-card-foot has-border">
							<button className="button is-dark" onClick={this.handle}>Generate</button>
							<hr/>
							<button className="button is-text" onClick={hide}>Cancel</button>
						</footer>
					</div>
				</div>
			</React.Fragment>, document.body
		) : null;
	}
}

export default Modal;