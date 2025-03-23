import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Button, Heading } from 'react-bulma-components';

import FileUpload from "../components/FileUpload";
import Icon from "../components/Icon";
import useModal from "../hooks/useModal";
import Toast from "../components/Toast";

import TicketList from "../components/TicketList";

import bgImg from "../images/background.jpg";

import { fetchTickets, getTickets } from "../stores/store";

const Dashboard = (/*{ data }*/) => {
  // const [ tickets, setTickets ] = useState(data);
  const dispatch = useDispatch();
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
  // export function updateUsers() {
  //   return (dispatch, getState) => {
  //   return fetch('/api/users')
  //   .then((res) => res.json())
  //   .then((users) => dispatch({ type: 'SET_USERS', payload: users }));
  //   };
  // };
  
  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);

  const handleKeyDown = e => {
    const trimmedText = e.target.value.trim();
    // If the user pressed the Enter key:
    if (e.key === 'Enter' && trimmedText) {
      // Dispatch the "todo added" action with this text
      dispatch({ type: 'tickets/search', payload: trimmedText });
      // And clear out the text input
      setText('');
    }
    console.log(trimmedText)
  }

  function ToastBtn({children, text}) {
    const {isShowing, toggle} = useModal();

    return (
      <>
        <Button onClick={toggle}>{children}</Button>
        <Toast
          text={text}
          variant={"danger"}
          isShowing={isShowing}
          hide={toggle}
        />
      </>
    )
  }
  
  return (
    <>      
      {/*<h6 className="is-uppercase is-dimmed has-text-weight-medium is-size-6 is-size-7-mobile">Page</h6>*/}
      {/*<h1 className="title is-family-secondary is-size-2-mobile">Home</h1>*/}
      
      <div className="container">
        <div className="columns">
          <div className="column is-6">

            {/*<Button color="primary" outlined>My Bulma button</Button>*/}
            {/*<ToastBtn text={"hello"}>Show toast</ToastBtn>*/}

            {/*<div className="message">Default Message.</div>*/}
            {/*<div className="message is-info">An info message 💁‍♂️</div>*/}
            {/*<div className="message is-success is-size-4">Big success message.</div>*/}

            {/*<div className="topbtn">*/}

              {/*<button className="button" onClick={insertTicket}>Insert</button>*/}

            {/*</div>*/}

            <TicketList tickets={tickets} />

          </div>

          <div className="column is-6">

            {/*<Heading size={2} weight={'semibold'} heading={true}>Hello</Heading>*/}
            {/*<Heading size={1} weight={'bold'} subtitle={true}>World</Heading>*/}
            {/*<h6 className="is-uppercase is-dimmed has-text-weight-medium is-size-6 is-size-7-mobile">Page</h6>*/}
            {/*<h1 className="title is-family-secondary is-size-2-mobile">Home</h1>*/}

            <div className="ticket-search box">
              {/*<figure className="image is-128x128">
                <img src={bgImg}/>
                <img src="./images/ticket-checking.png" alt=""/>
              </figure>*/}
                    
                  {/*<FileUpload onFileUpload={setTickets} />*/}

              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input is-rounded" 
                  placeholder="Enter ticket number"
                  type="text"
                  autoFocus={true}
                  value={text}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <Icon className="is-left" icon="search" color="white"/>
                {/*<Icon className="is-right" icon="cross" color="white"/>*/}
              </p>

            </div>

          </div>
        </div>

      </div>

    </>
  );
};

export default Dashboard;