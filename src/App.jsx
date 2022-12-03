import React, { useState, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from 'react-redux';

import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import NoMatch from "./pages/NoMatch";
import RandomTicket from "./pages/RandomTicket";

import Icon from "./components/Icon";

import './App.scss';

import { getTickets } from "./data";
import Ticket from "./scripts/Ticket";
import List from "./scripts/List";

import { /*getTickets,*/ getLoadableStatus, setLoadableStatus } from "./reduxStore";

function App() {
  // const getTickets = await window.ticket.getTickets;
  let tickets = getTickets();

  let systemRef = React.createRef();
  let darkLightRef = React.createRef();
  
  const updateScratchpad = newValue => {
    window.ticket.saveContent(newValue);
  };
  
  const toggleDarkMode = async () => {
    let isDarkMode = await window.ticket.toggle();
    darkLightRef.current.innerText = isDarkMode ? 'Light' : 'Dark';
    darkLightRef.current.classList.add('is-primary');
    systemRef.current.classList.remove('is-primary');
  };

  const systemDarkMode = async () => {
    await window.ticket.system();
    darkLightRef.current.classList.remove('is-primary');
    systemRef.current.classList.add('is-primary');
  }

  // const unsubscribe = store.subscribe(() =>
  //     console.log('State after dispatch: ', store.getState())
  // );
  // unsubscribe();

  const dispatch = useDispatch();
  
  dispatch(setLoadableStatus('hasValue'));

  const loadable = useSelector(getLoadableStatus);
  console.log(loadable)


  return (
    <div className="layout">

      <aside className="sidebar has-background-menu">

        <div className="sidebar-nav">

          <h1 className="logo">
            Ticket
          </h1>

          <hr/>

          <div className="field has-addons">
            <p className="control">
              <button className="button is-small" ref={darkLightRef} onClick={toggleDarkMode}>Dark</button>
            </p>
            <p className="control">
              <button className="button is-small" ref={systemRef} onClick={systemDarkMode}>System</button>
            </p>
          </div>

          <hr/>

          <div className="menu">
            <p className="menu-label">Menu</p>
            <ul className="menu-list">
              <li>
                <NavLink to="/" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="home"/>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="list"/>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="random" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="list"/>
                  Random Ticket
                </NavLink>
              </li>
              <li>
                <NavLink to="stats" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="segment"/>
                  Stats
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

          <div className="mt-5 m-2">
            <small>Made with ❤ in Beautiful Madang.</small>
          </div>

      </aside>

      <main className="page">
        
        <Routes>
          <Route exact index path="/" element={<Home data={tickets} />} />
          <Route exact path="/dashboard" element={<Dashboard data={tickets} />} />
          <Route exact path="/random" element={<RandomTicket data={tickets} />} />
          <Route exact path="/stats" element={<Stats data={tickets} />} />
          <Route exact path="/main_window" element={<Navigate to="/" replace={true} />} />
          <Route exact path="*" element={<NoMatch/>} />
        </Routes>

      </main>

    </div>
  )
}

export default App;