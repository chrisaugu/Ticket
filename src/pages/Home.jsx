import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import FileUpload from "../components/FileUpload";
import Icon from "../components/Icon";
import Toast from "../components/Toast";

import TicketList from "../components/TicketList";

import { Button } from 'react-bulma-components';

import bgImg from "../images/background.jpg";

const Dashboard = ({ data }) => {
  const [ tickets, setTickets ] = useState(data);
  
  const handleRequestTickets = async () => {
    await window.ticket.getAll();
    // console.log("ehh")
  }

  const [text, setText] = useState('');
  const dispatch = useDispatch();

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
  
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/*<h6 className="is-uppercase is-dimmed has-text-weight-medium is-size-6 is-size-7-mobile">Page</h6>*/}
      {/*<h1 className="title is-family-secondary is-size-2-mobile">Home</h1>*/}
      <div className="container">
        <div className="columns">
          <div className="column is-6">

            {/*<Button color="primary" outlined>My Bulma button</Button>*/}

            {/*<div className="message">Default Message.</div>*/}
            {/*<div className="message is-info">An info message 💁‍♂️</div>*/}
            {/*<div className="message is-success is-size-4">Big success message.</div>*/}

            <div className="topbtn">

              <button className="button" onClick={handleRequestTickets}>get all</button>

              <button className="button" onClick={(conten)=>{}}> Async</button>

            </div>

            <TicketList tickets={tickets} />

          </div>

          <div className="column is-6">

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