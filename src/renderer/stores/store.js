import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
// import { configureStore } from "@reduxjs/toolkit";

/**
 * Reducers
 */
const filtersReducer = (state = {
  filter: 'All',
  tickets: []
}, action) => {
  switch (action.type) {
    case 'tickets/filter': {

      return {
        // Again, one less level of nesting to copy
        ...state,
        tickets: action.payload
      }
    }

    default:
      return state
  }
}

const ticketsReducer = (state = {tickets: []}, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS': {
      return {
        ...state,
        tickets: action.payload,
      };
    }

    case 'tickets/search': {

      return {
        ...state,
        tickets: action.payload
      }
    }

    default:
      return state
  }
}

const loaderReducer = (state = {
  isShown: false,
  state: 'loading'
}, action) => {
  switch (action.type) {

    case "STATUS_LOADABLE_CHANGED": {
      return {
        ...state,
        state: action.payload
      }
    }
    
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tickets: ticketsReducer,
  filters: filtersReducer,
  loadable: loaderReducer
});

// const store = configureStore({ reducer: rootReducer });

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);
export default store;

/**
 * Actions
 */
export const getTickets2 = async (payload) => {
  // import { getTickets } from "./data";
  // let json = await window.ticket.getAll();
  window.ticket.getAll().then((json) => {
    return {
      type: "DATA_LOADED", 
      payload: json 
    };
  });
}

export const fetchTickets = (tickets) => ({
  type: "FETCH_TICKETS",
  payload: tickets
});

export const setLoadableStatus = (payload) => ({
  type: "STATUS_LOADABLE_CHANGED",
  payload
});

/**
 * Selectors
 */
export const getTicketState = (store) => store.tickets;
// export const getTicketList = (store) => getTicketState(store) ? getTicketState(store).allIds : [];
export const getTickets = (store) => store.tickets ? store.tickets.tickets : [];

export const getLoadableStatus = (store) => store.loadable;

export const getFilterState = (store) => store.filters;
