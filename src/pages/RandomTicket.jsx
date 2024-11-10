import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'react-bulma-components';

import Icon from "../components/Icon";
import RandomlySelectTicketModal from "../components/RandomlySelectTicketModal";
import useModal from '../hooks/useModal';

// import confetti from "../script/confetti";
// import p5 from "../script/p5";

import { fetchTickets, getTickets} from "../stores/store";

const Dashboard = (/*{ data }*/) => {
  const dispatch = useDispatch();
  // const [ tickets, setTickets ] = useState(data);
  const { isShowing, toggle } = useModal();
  const [ selectedTicket, setSelectedTicket ] = useState([]);

  const tickets = useSelector(getTickets);
  
  useEffect(() => {
    window.ticket.getAll()
      .then((results) => {
        // setTickets(results);
        dispatch(fetchTickets(results));
      })
      .catch(error => {
          // setIsError(true);
          console.error(error);
      });

    // setIsLoading(false);

  }, []);



  function random() {
    console.log("Randomizing...")
    let tickets_count = tickets.length;
    
    const min = 1;
    const max = tickets_count;
    const rand = Math.floor(min + Math.random() * (max - min));
    // var rand = Math.floor(Math.random() * tickets_count) + 1; // returns a random interger from 1 to 500;
    if (rand > tickets_count) {
      console.log("Out of range. randomize again");
    }
    console.log(rand);
    console.log(tickets[rand].ticket_no);
    // ticketsList.moveTo(rand);
    // console.log(ticketsList.getElement());
    // setSelectedTicket(ticketsList.getElement());
    setSelectedTicket(tickets[rand].ticket_no);
    toggle();
  }
  
  return (
    <>
      <Helmet>
        <title>Random Ticket</title>
      </Helmet>

      <div className="container">
        <div className="columns">

          <div className="column is-5">

            <Button className="is-primary has-icons-left" onClick={random} title="Select Random Ticket">
              <Icon icon="plus" color="white"/>Random Ticket
            </Button>

            <RandomlySelectTicketModal
              selectedTicket={selectedTicket}
              isShowing={isShowing}
              hide={toggle}
            />

          </div>

          <div className="column is-7 is-primary">

          </div>

        </div>

      </div>

    </>
  );
};

export default Dashboard;