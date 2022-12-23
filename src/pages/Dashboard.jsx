import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import _ from 'underscore';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Progress, Loader } from 'react-bulma-components';

import { parse_csv_to_json } from "../scripts/utils";

import GenerateTicketModal from "../components/GenerateTicketModal";
import Modal from "../components/Modal";
import useModal from '../hooks/useModal';
import Icon from "../components/Icon";
import TicketList from "../components/TicketList";
import Ticket from "../scripts/Ticket";
import List from "../scripts/List";
import Toast from "../components/Toast";

import { fetchTickets, getTickets } from "../reduxStore";

const Dashboard = (/*{ data }*/) => {
  // const [ tickets, setTickets ] = useState(data);
  const dispatch = useDispatch();

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

  const tickets = useSelector(getTickets);
  
  // let list = new List();
  // for (let i = 0; i < tickets.length; i++) {
  //   list.append(tickets[i]);
  // }
  // const [ticketsList, setTicketsList] = useState(list);
  // setTicketsList(list)
  
  // setMyArray(oldArray => [...oldArray, newElement]);
  // let tickets = [];

  // function makeList(arr) {

  // }

  function GenerateTicketBtn() {
    const {isShowing, toggle} = useModal();

    const handleNewTickets = async (t) => {
      // if (tickets.length > 0) {
      //   if (alert("There are existing tickets. Do you want to override them?")) {
      //     setTickets(t);
      //   }
      // } else {
      //   setTickets(t);
      // }
      // setTickets(t);

      if (tickets.length > 0) {
        await window.ticket.deleteAll();
      }
      // save all tickets to database
      window.ticket.insertMany(t).then((res) => {
        toggle();
      });
    }
  
    return (
      <>
        <button className="button has-icons-left" onClick={toggle} title="Generate Ticket">
          <Icon icon="plus" color="white"/>Generate Tickets
        </button>
        <GenerateTicketModal
          isShowing={isShowing}
          hide={toggle}
          handleNewTickets={handleNewTickets}
        />
      </>
    )
  }

  function ImportTicketsBtn() {

    const handleImport = (e) => {
      let files = e.target.files;
      if (files && files.length > 0) {
        let file = files.item(0);
        file.text().then(async function(response){
          console.log(response);
          let data = parse_csv_to_json(response);

          let list = [];
          for (let i = 0; i < data.length; i++) {
            let ticket = data[i];
            let ticketId = ticket['TicketId'] != null ? ticket['TicketId'] : i+1;
            list.push(new Ticket(ticketId, ticket['TicketNo'], ticket['TicketStatus'], ticket['TicketPrice']));
          }
          
          // setTickets(list);
          await window.ticket.deleteAll();
          window.ticket.insertMany(list).then((result) => {
            // show progressbar
          });
        })
        .catch(function(error) {
          console.error(error);
        });
      }
    }

    return (
      <>
        <div className="file is-primary is-small">
          <label className="file-label">
            <input className="file-input" type="file" name="ticketscsv" accept="text/csv" onChange={handleImport}/>
            <span className="file-cta" title="Import CSV file">
              <span className="file-icon">
                <Icon icon="share" color="white"/>
              </span>
              <span className="file-label">
                Import
              </span>
            </span>
          </label>
        </div>
      </>
    )
  }

  const ExportTicketsBtn = () => {

    const handleExport = (e) => {
      // CSV
      // var args = [$('#dvData>table'), 'export.csv'];

      // exportTableToCSV.apply(this, args);

      // If CSV, don't do event.preventDefault() or return false
      // We actually need this to be a typical hyperlink
    }

    return (
      <div className="file is-primary is-small">
        <label className="file-label">
          <input className="file-input" type="file" name="ticketscsv" accept="text/csv" onChange={handleExport}/>
          <span className="file-cta" title="Export CSV file">
            <span className="file-icon">
              <Icon icon="export" color="white"/>
            </span>
            <span className="file-label">
              Export
            </span>
          </span>
        </label>
      </div>
    )
  }

  const filterTicket = (type) => {
    _.filter(tickets, function(num) { 
      return Math.sin(num); 
    });
  }

  const HelpBtn = () => {
    const { isShowing, toggle } = useModal();

    return (
      <>
        <button className="button has-icons-left" onClick={toggle}>
          <Icon icon="help" color="white"/>
          Help
        </button>
        <Modal
          tickets={tickets}
          isShowing={isShowing}
          hide={toggle}
        />
      </>
    )
  }

  const SearchBtn = () => {
    const { isShowing, toggle } = useModal();

    return (
      <>
        <button className="button" onClick={toggle}>
          <Icon icon="search" color="white"/>
        </button>
        <Modal
          tickets={tickets}
          isShowing={isShowing}
          hide={toggle}
        />
      </>
    )
  }
  
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/*<h6 className="is-uppercase is-dimmed has-text-weight-medium is-size-6 is-size-7-mobile">Page</h6>*/}
      {/*<h1 className="title is-family-secondary is-size-2-mobile">Dashboard</h1>*/}
      <div className="container is-fullhd">

          <div className="columns is-small">
            
            <div className="column">

              {/*<Progress value='2' max='4' size='3'/>*/}
              {/*<Loader/>*/}
              
              <header className="container is-sticky">
                <nav className="level">

                  {/*Left side*/}
                  <div className="level-left">
                    <div className="level-item">
                      <p className="subtitle is-5">
                        <strong>{tickets && tickets.length}</strong> Tickets
                      </p>
                    </div>
                  </div>

                  {/*Right side*/}
                  <div className="level-right">
                    {/*<p className="level-item"><a href="#" onClick={filterTicket("all")}><strong>All</strong></a></p>*/}
                    {/*<p className="level-item"><a href="#" onClick={filterTicket("checked-in")}>Checked In</a></p>*/}
                    {/*<p className="level-item"><a href="#" onClick={filterTicket("checked-out")}>Checked Out</a></p>*/}
                    {/*<hr/>*/}
                    <p className="level-item"><GenerateTicketBtn/></p>
                    <div className="level-item"><ImportTicketsBtn/></div>
                    {/*<div className="level-item"><ExportTicketsBtn/></div>*/}
                    <p className="level-item"><HelpBtn/></p>
                    <p className="level-item"><SearchBtn/></p>
                  </div>

                </nav>
              </header>
              
              <TicketList tickets={tickets} />

            </div>

          </div>

      </div>
    </>
  );
};

export default Dashboard;