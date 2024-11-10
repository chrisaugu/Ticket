import React, { /*useRef, useState,*/ useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
// import { Chart } from "react-chartjs-2";
// import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, CategoryScale, PieController, BarController, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";

import { Container, Columns/*, Box, Heading as Typography*/ } from 'react-bulma-components';

import Ticket from "../scripts/Ticket";
import List from "../scripts/List";

import { fetchTickets, getTickets } from "../stores/store";

// ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, PieController, BarController, BarElement, Title, ArcElement, Tooltip, Legend);

// function triggerTooltip(chart) {
//   const tooltip = chart.tooltip;

//   if (!tooltip) {
//     return;
//   }

//   if (tooltip.getActiveElements().length > 0) {
//     tooltip.setActiveElements([], { x: 0, y: 0 });
//   } else {
//     const { chartArea } = chart;

//     tooltip.setActiveElements(
//       [
//         {
//           datasetIndex: 0,
//           index: 2,
//         },
//         {
//           datasetIndex: 1,
//           index: 2,
//         },
//       ],
//       {
//         x: (chartArea.left + chartArea.right) / 2,
//         y: (chartArea.top + chartArea.bottom) / 2,
//       }
//     );
//   }

//   chart.update();
// }

const Stats = (/*{ data }*/) => {
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

  let ticket_price = tickets[0].ticket_price;
  let total_tickets = tickets.length;

  let ticketsList = new List();
  // for (let i = 0; i < total_tickets; i++) {
  //   ticketsList.append(tickets[i]);
  // }
  for (var ticket of tickets) {
    ticketsList.append(new Ticket(ticket.ticket_id, ticket.ticket_no, ticket.ticket_status));
  }

  // for (ticketsList.end(); ticketsList.currPos() > 0; ticketsList.prev()) {
  //   if (ticketsList.getElement() instanceof Ticket) {
  //     console.log(ticketsList.getElement()['ticket_no'])
  //   }
  // }

  let tickets_sold = 0;
  let tickets_checkedin = 0;
  for (let i = 0; i < total_tickets; i++) {
    if (tickets[i].ticket_status === "CHECKED IN") {
      tickets_sold++;
      tickets_checkedin++;
    }
  }
  // let tickets_checkedout = total_tickets - tickets_checkedin;
  // let tickets_sold = new List();
  // for (ticketsList.end(); ticketsList.currPos() > 0; ticketsList.prev()) {
  //   if (ticketsList.getElement() instanceof Ticket) {
  //     if (ticketsList.getElement()['ticket_no'] !== undefined) {
  //       tickets_sold.append(ticketsList.getElement())
  //     }
  //   }
  // }
  
  let tickets_profit = tickets_sold * ticket_price;

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // const [chartData, setChartData] = useState({
  //   labels: [],
  //   datasets: [],
  // });
  // const chartRef = useRef(null);

  // useEffect(() => {
  //   const chart = chartRef.current;

  //   if (chart) {
  //     setChartData({
  //       labels,
  //       datasets: [
  //         {
  //           type: 'line',
  //           label: 'Old',
  //           data: [12, 3, 5, 7, 5, 8, 1],
  //           borderWidth: 1,
  //           borderColor: 'rgb(255, 99, 132)',
  //           // borderColor: [
  //           //   'rgba(255, 99, 132, 1)',
  //           //   'rgba(54, 162, 235, 1)',
  //           //   'rgba(255, 206, 86, 1)',
  //           //   'rgba(75, 192, 192, 1)',
  //           //   'rgba(153, 102, 255, 1)',
  //           //   'rgba(255, 159, 64, 1)',
  //           // ]
  //           backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //           // backgroundColor: createBackgroundGradient(chart.ctx),
  //           // backgroundColor: [
  //           //   'rgba(255, 99, 132, 0.2)',
  //           //   'rgba(54, 162, 235, 0.2)',
  //           //   'rgba(255, 206, 86, 0.2)',
  //           //   'rgba(75, 192, 192, 0.2)',
  //           //   'rgba(153, 102, 255, 0.2)',
  //           //   'rgba(255, 159, 64, 0.2)',
  //           // ],
  //         },
  //         // {
  //         //   type: 'line',
  //         //   label: 'Dataset 1',
  //         //   fill: false,
  //         //   data: labels.map(() => randomNumber({ min: -1000, max: 1000 })),
  //         //   borderColor: 'rgb(53, 162, 235)',
  //         //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //         //   borderWidth: 2,
  //         // },
  //         // {
  //         //   type: 'bar',
  //         //   label: 'Dataset 2',
  //         //   data: labels.map(() => randomNumber({ min: -1000, max: 1000 })),
  //         //   backgroundColor: 'rgb(75, 192, 192)',
  //         //   borderColor: 'white',
  //         //   borderWidth: 2,
  //         // },
  //         // {
  //         //   type: 'bar',
  //         //   label: 'Dataset 3',
  //         //   data: labels.map(() => randomNumber({ min: -1000, max: 1000 })),
  //         //   backgroundColor: 'rgb(53, 162, 235)',
  //         // },
  //         // {
  //         //   label: 'New',
  //         //   data: labels.map(() => randomNumber({ min: -1000, max: 1000 })),
  //         //   backgroundColor: [
  //         //     'rgba(255, 99, 132, 0.2)',
  //         //     'rgba(54, 162, 235, 0.2)',
  //         //     'rgba(255, 206, 86, 0.2)',
  //         //     'rgba(75, 192, 192, 0.2)',
  //         //     'rgba(153, 102, 255, 0.2)',
  //         //     'rgba(255, 159, 64, 0.2)',
  //         //   ],
  //         //   borderWidth: 1,
  //         //   borderColor: [
  //         //     'rgba(255, 99, 132, 1)',
  //         //     'rgba(54, 162, 235, 1)',
  //         //     'rgba(255, 206, 86, 1)',
  //         //     'rgba(75, 192, 192, 1)',
  //         //     'rgba(153, 102, 255, 1)',
  //         //     'rgba(255, 159, 64, 1)',
  //         //   ]
  //         // },
  //       ]
  //     });
  //   }
  // }, []);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //       display: false,
  //       labels: {
  //         font: {
  //           size: 12,
  //         },
  //       },
  //     },
  //     title: {
  //       display: true,
  //       text: 'Sales',
  //     },
  //   },
  // };

  // const [chartView, setChartView] = useState([]);
  // const summaryRef = useRef(null);

  // const pieData = {
  //   labels: ["Tickets Sold", "Tickets Checked In", "Tickets Checked Out", "tickets_profit"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [
  //         tickets_sold, 
  //         tickets_checkedin, 
  //         tickets_checkedout, 
  //         tickets_profit
  //       ],
  //       backgroundColor: ["#F2CC59", "#BA68C8", "#407BFF", "#E6E5E6"],
  //       borderColor: ["#F2CC59", "#BA68C8", "#407BFF", "#E6E5E6"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const pieOptions = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //       labels: {
  //         font: {
  //           size: 12,
  //         },
  //       },
  //     },
  //   },
  // };

  // useEffect(() => {
  //   setChartView(summaryRef?.current?.legend?.legendItems);
  // }, []);

  // function randomNumber(opts) {
  //   let arr = [];

  //   for (let i = 0; i < opts.max - opts.min; i++) {
  //     arr.push(Math.floor(opts.min + Math.random() * (opts.max-opts.min)));
  //   }

  //   return arr;
  // }

  return (
    <>
      <Helmet>
        <title>Stats</title>
      </Helmet>
      {/*<h6 className="is-uppercase is-dimmed has-text-weight-medium is-size-6 is-size-7-mobile">Page</h6>*/}
      {/*<h1 className="title is-family-secondary is-size-2-mobile">Stats</h1>*/}
      <Container>

        <Columns breakpoint="tablet">
          <div className="column is-4">
            <div className="box is-raised">
              <h1 className="title is-1 is-family-primary">{total_tickets} total</h1>
              <div className="subtitle">ticket{`${total_tickets > 0 ? 's' : ''}`}</div>
            </div>
          </div>
          <div className="column is-4">
            <div className="box is-raised">
              <h1 className="title is-1 is-family-primary">K{ticket_price}</h1>
              <div className="subtitle">per ticket</div>
            </div>
          </div>
          <div className="column is-4">
            <div className="box is-raised">
              <h1 className="title is-1 is-family-primary">{tickets_sold} tickets</h1>
              <div className="subtitle">sold</div>
            </div>
          </div>
          <div className="column is-4">
            <div className="box is-raised">
              <h1 className="title is-1 is-family-primary">K{tickets_profit}</h1>
              <div className="subtitle">made</div>
            </div>
          </div>
          <div className="column is-4">
            <div className="box is-raised">
              <h1 className="title is-1 is-family-primary">{tickets_checkedin} tickets</h1>
              <div className="subtitle">checked in</div>
            </div>
          </div>
              
          {/*<Columns.Column size="4">
            <Box className="is-raised">
              <Chart type='pie' data={pieData} options={pieOptions} ref={summaryRef} />    
              
              {chartView?.map((data, i) => (
                <Box display="flex" sx={{ mt: 2 }} key={i}>
                  <Box
                    sx={{
                      height: 16,
                      width: 16,
                      background: `${data?.fillStyle}`,
                      borderRadius: 5,
                      mr: 0.5,
                      }}
                    />
                    <Typography size="2" variant="body2"> {data?.text}</Typography>
                </Box>
              ))}

            </Box>
          </Columns.Column>*/}

          {/*<Columns.Column size="6">
            <Box className="is-raised">
              <Chart ref={chartRef} type='line' options={options} data={chartData} />
            </Box>
          </Columns.Column>*/}
          
        </Columns>

      </Container>
    </>
  );
}


export default Stats;