import React, { useRef, useState } from 'react';
// import _ from 'underscore';
import { Table } from 'react-bulma-components';

// import useModal from "../hooks/useModal";
// import RandomlySelectTicketModal from "./RandomlySelectTicketModal";
// import GenerateTicketModal from "./GenerateTicketModal";
import Ticket from "../scripts/Ticket";
import List from "../scripts/List";
import Icon from "./Icon";

const TicketList = ({ tickets }) => {
  // const [selectedTicket, setSelectedTicket] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // console.log(tickets)
  let list = new List();
  for (let i = 0; i < tickets.length; i++) {
    list.append(tickets[i]);
  }
  // let [ticketsList, setTicketsList] = useState(list);
  
  // let [ticketsx, setTicketsx] = useState({
  //   isAllSelected: false,
  //   ticketsList: tickets
  // });

  // setTicketsList(list);
  // console.log(ticketsList)

  // let tickets_count = 500;
  // let rand = Math.random();
  // let checkbox = useRef();


  // const sortData = (data) => {
  //   setTicketsx(_.sortBy(data, 'name'));
  // }

  const ticketlist = () => {
    for (list.front(); list.currPos() < list.length(); list.next()) {
      if (list.getElement() instanceof Ticket) {
        if (list.getElement()['gender'] === 'female') {
          console.log(list.getElement()['name'])
        }
      }
    }
  }

  const handleDeleteOneTicket = (id) => {
    alert(`Are you sure you want to delete ticket number ${id}`);
    window.ticket.deleteOne(id).then((result) => {
      if (result) {
        alert('Successful');
      }
      else {
        alert('Unsuccessful');
      }
    });

  }
  const handleDeleteManyTickets = (ids) => {
    alert(`Are you sure you want to delete ticket number ${ids}`);
    window.ticket.deleteMany(ids).then((result) => {
      if (result) {
        alert('Successful');
      }
      else {
        alert('Successful');
      }
    });
  }
  const handleCheckedOutTicket = (id) => {
    let _status = "CHECKED OUT";
    window.ticket.changeStatus(id, _status).then((result) => {
      if (result) {
        alert(`Ticket number ${id} is now ${_status}`);
      }
      else {
        alert(`Ticket number ${id} is not ${_status}`);
      }
    });
  }
  const handleCheckedInTicket = (id) => {
    let _status = "CHECKED IN";
    window.ticket.changeStatus(id, _status).then((result) => {
      if (result) {
        alert(`Ticket number ${id} is now ${_status}`);
      }
      else {
        alert(`Ticket number ${id} is not ${_status}`);
      }
    });
  }

  function Checkbox({name, value, className, checked, indeterminate, transitionDuration, onChange}) {
    let classes = className != null ? `checkbox ${className}` : `checkbox`;

    return (
      <label className={classes}>
        <input 
          type="checkbox" 
          name={name} 
          checked={checked || false}  
          value={value}
          onChange={onChange} />
        <span className="checkbox-mark"></span>
      </label>
    );
  }

  function Th({children, sorted, reversed, onSort}) {
    const icon = sorted ? (reversed ? "arrow-up" : "arrow-down") : 'sort';

    return (
      <th>
        <div className="button is-borderless is-rounded has-icons-left is-small" onClick={onSort}>
          <Icon icon={icon} color="red" size={40}/>
          {children}
        </div>
      </th>
    );
  }

  function TableRow({ticket, checked, onCheck}) {
    return (
      <tr className={checked ? 'is-selected' : ''}>
        <td>
          <Checkbox
            className='is-small'
            name={ticket.ticket_no} 
            checked={checked || false}
            value={ticket.ticket_id}
            onChange={onCheck}
            transitionDuration={0}
          />
        </td>
        <td>{ticket.ticket_no}</td>
        <td><div className={`tag ${ticket.ticket_status === "CHECKED IN" ? 'has-background-green' : 'has-background-link'} has-text-info-lighter is-small`}>{ticket.ticket_status}</div></td>
        {/*<td>{ticket.barcode_text}</td>*/}
        <td>
          <div className="field has-addons">
              <p className="control">
                  <button className="button is-square xis-borderless is-small" placeholder="Delete" onClick={() => handleDeleteOneTicket(ticket.ticket_id)}>
                    <Icon color="red" icon="trash"/>
                  </button>
              </p>
              <p className="control">
                { ticket.ticket_status === "CHECKED IN" ?
                  (<button className="button is-square xis-borderless is-small" placeholder="Checked In" onClick={() => handleCheckedOutTicket(ticket.ticket_id)}>
                    <Icon color="red" icon="cross"/>
                  </button>)
                 :
                  (<button className="button is-square xis-borderless is-small" placeholder="Checked Out" onClick={() => handleCheckedInTicket(ticket.ticket_id)}>
                    <Icon color="red" icon="check"/>
                  </button>)
                }
              </p>
          </div>
        </td>
      </tr>
    );
  }

  function filterData(data, search) {
    return data;
    // const query = search.toLowerCase().trim();
    // return _.filter([1, 2, 3, 4, 5, 6], function(num) { 
    //   return num % 2 === 0; 
    // });
    // return data.filter((item) =>
    //   Object.keys(data[0]).some((key) => {
    //     if (typeof item[key] === 'number') {
    //       Number(item[key]).toString().toLowerCase().includes(query)
    //     }
    //     else {
    //       item[key].toLowerCase().includes(query)
    //     }
    //   })
    // );
  }

  function sortData(
    data, //: RowData[],
    payload //: { sortBy: keyof RowData | null; reversed: boolean; search: string }
  ) {
    const { sortBy } = payload;

    if (!sortBy) {
      return filterData(data, payload.search);
    }
    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          // return b[sortBy].localeCompare(a[sortBy]);
          if (sortBy === 'ticket_id') {
            return a[sortBy] - b[sortBy];
          }
          if (sortBy === 'ticket_status') {
            if (a[sortBy] < b[sortBy]) return -1;
            if (b[sortBy] < a[sortBy]) return 1;
            return 0;
          }
        }

        // return a[sortBy].localeCompare(b[sortBy]);
        if (sortBy === 'ticket_id') {
          return b[sortBy] - a[sortBy];
        }
        if (sortBy === 'ticket_status') {
          if (a[sortBy] < b[sortBy]) return 1;
          if (b[sortBy] < a[sortBy]) return -1;
          // ["Bob", "Mary", "Alice"].sort((a, b) => a > b ? 1 : -1);
          return 0;
        }

        return 0;
      }),
      payload.search
    );
  }

  function TableSort({data}) {
    const [selection, setSelection] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field) => {
      const reversed = field === sortBy ? !reverseSortDirection : false;
      setReverseSortDirection(reversed);
      setSortBy(field);
      setSortedData(sortData(data, { sortBy: field, reversed, search }));

      // console.log(data)
      // console.log(sortedData)
    };

    // const handleSearchChange = (event) => {
    //   const { value } = event.currentTarget;
    //   setSearch(value);
    //   setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    // };

    const toggleRow = (id) => {
      setSelection((current) => 
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      );
    }
    
    const toggleAll = () => {
      setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.ticket_id)));
    }

    const rows = sortedData.map((ticket, index) => {
      const selected = selection.includes(ticket.ticket_id);
      // <TableRow key={index} ticket={ticket} checked={selected} onCheck={(e) => onCheck(ticket.ticket_no, e.target.checked)} />  
      return (
        <TableRow key={index} ticket={ticket} checked={selected} onCheck={(e) => toggleRow(ticket.ticket_id)} />
      )
    });

    return (
      <Table id="tickets" className="is-stripedx is-hoverablex is-fullwidth">
        <thead className="is-sticky">
          <tr className="is-clickable">
            <th style={{ width: 40 }}>
              <Checkbox
                name="select-all"
                value="all"
                // onChange={(e) => onCheck('all', e.target.checked)}
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <Th
              sorted={sortBy === 'ticket_id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('ticket_id')}>Ticket No</Th>
            <Th
              sorted={sortBy === 'ticket_status'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('ticket_status')}>Status</Th>
            {/*<Th style={{"width": "18em"}}>Barcode Text</Th>*/}
            <th style={{width: `8em`}}>
              <button disabled={!(selection.length > 0)} className={`button is-borderless is-rounded has-icons-left is-small`} onClick={(e) => handleDeleteManyTickets(selection)}>
                <Icon icon='trash' color="black" size={40}/> Delete
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={/*Object.keys(ticketModel).length*/5}>
                <h1 align="center" className="has-text-weight-medium is-size-4">
                  No tickets available
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

  return (
    <React.Fragment>
      <div className="tickets-list">
        
        {/*<CheckBoxList options={city.checkList} isCheckedAll={city.isAllSelected} onCheck={onCheckBoxChange} />*/}
        
        <div className="table-container">

          <TableSort data={tickets} />

        </div>

      </div>
    </React.Fragment>
  )
}

export default TicketList;



// import React from 'react'
// import { useSelector } from 'react-redux'
// import TodoListItem from './TodoListItem'

// const selectTodos = state => state.todos

// const TodoList = () => {
//   const todos = useSelector(selectTodos)

//   // since `todos` is an array, we can loop over it
//   const renderedListItems = todos.map(todo => {
//     return <TodoListItem key={todo.id} todo={todo} />
//   })

//   return <ul className="todo-list">{renderedListItems}</ul>
// }

// export default TodoList
// import { connect } from 'react-redux';
// import { updateUsers } from './actions';
// class UserList extends React.Component {
// componentDidMount(state, { updateUsers }) {
// updateUsers();
// },
// render({ users }) {
// return (
// ...
// );
// }
// }
// const mapStateToProps = ({ users }) => users;
// const mapDispatchToProps = { updateUsers };
// export default connect(mapStateToProps, mapDispatchToProps)(UserList);