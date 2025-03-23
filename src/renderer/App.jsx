import React from "react";

import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import NoMatch from "./pages/NoMatch";
import RandomTicket from "./pages/RandomTicket";

import Icon from "./components/Icon";

import './App.scss';

// import Ticket from "./libs/Ticket";
// import List from "./libs/List";

// import { fetchTickets, getTickets, getLoadableStatus, setLoadableStatus } from "./stores/store";

function App() {
  // const [tickets, setTickets] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   window.ticket.getAll()
  //     .then((results) => {
  //       // setTickets(results);
  //       dispatch(fetchTickets(results));
  //     })
  //     .catch(error => {
  //         // setIsError(true);
  //         console.error(error);
  //     });

  //   // setIsLoading(false);

  // }, []);

  // const tickets = useSelector(getTickets);
  // console.log(tickets)

  let systemRef = React.createRef();
  let darkLightRef = React.createRef();

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

  // dispatch(setLoadableStatus('hasValue'));

  // const loadable = useSelector(getLoadableStatus);
  // console.log(loadable)


  return (
    <div className="layout">

      <aside className="sidebar has-background-menu">

        <div className="sidebar-nav">

          <h1 className="logo">
            Ticket
          </h1>

          {/*<hr/>*/}

          {/*<div className="field has-addons">
            <p className="control">
              <button className="button is-small" ref={darkLightRef} onClick={toggleDarkMode}>Dark</button>
            </p>
            <p className="control">
              <button className="button is-small" ref={systemRef} onClick={systemDarkMode}>System</button>
            </p>
          </div>*/}

          <hr />

          <div className="menu">
            <p className="menu-label">Menu</p>
            <ul className="menu-list">
              <li>
                <NavLink to="/" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="home" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="list" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="random" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="list" />
                  Random Ticket
                </NavLink>
              </li>
              <li>
                <NavLink to="stats" className={isActive => "is-active" + (!isActive ? " unselected" : "")}>
                  <Icon className="has-fill-red" icon="segment" />
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
          <Route exact index path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/random" element={<RandomTicket />} />
          <Route exact path="/stats" element={<Stats />} />
          <Route exact path="/main_window" element={<Navigate to="/" replace={true} />} />
          <Route exact path="*" element={<NoMatch />} />
        </Routes>

      </main>

    </div>
  )
}

export default App;