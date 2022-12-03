let clapSound;

function preload() {
  // soundFormats('mp3', 'ogg');
  // soundFile = loadSound('assets/beatbox.ogg');
  clapSound = loadSound('sounds/clap.mp3');
}

let tickets = [];
let tickets_count = 500;
let rand = Math.random();

var $randomSelectModal = $("#randomSelect");
$("#randomlySelectTicketBtn").on('click', (e) => {
  $randomSelectModal.toggleClass("is-active");

  randomSelect();
  
});

$randomSelectModal.find("[aria-label=close]").on('click', (e) => {
  confetti.stop();
  $randomSelectModal.toggleClass("is-active");
});

function randomSelect() {
  // $("#randomSelect").toggleClass("is-active")
  // $("#randomSelect .modal-close").toggleClass("is-active")

  var n = Math.floor(Math.random() * tickets_count) + 1; // returns a random interger from 1 to 500;
  if (n > tickets_count) {
    console.log("Out of range. randomize again");
  }

  $("#text1").text(tickets[n].ticket_no);

  // setTimeout(function() {
  //   for (var i = 0; i < tickets_count; i++) {
  //     var randIndex = Math.floor(rand * tickets_count) + 1; // returns a random interger from 1 to 500;
  //     if (randIndex > tickets_count) {
  //       console.log("Out of range. randomize again");
  //     }
  //     let randomTicket = tickets[randIndex];

  //     $("#text1").text(randomTicket.ticket_no);
  //   }
  // }, 5000);

  if (clapSound.isPlaying()) {
    clapSound.stop();
  } 
  else {
    clapSound.play();
  }



  // for starting the confetti 
  const start = () => {
    setTimeout(function() {
        confetti.start()
    }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
  };

  //  for stopping the confetti 
  const stop = () => {
    setTimeout(function() {
        confetti.stop()
    }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
  };

  // after this here we are calling both the function so it works
  start();
  stop();

}

var $generateTicketModal = $("#generateTickets");
$("#generateTicketBtn").on('click', (e) => {
  $generateTicketModal.toggleClass("is-active");

  generateTickets();
});

$generateTicketModal.find("[aria-label=close]").on('click', (e) => {
  $generateTicketModal.toggleClass("is-active");
});

function Ticket(id, number, status) {
  this.ticket_id = id;
  this.ticket_no = number;
  this.ticket_status = status;
}

function generateTickets() {
  // $("#generateTickets").toggleClass("is-active");

  for (var i = tickets_count; i > 0; --i) {
    if (i >= 100 && i < 1000) {
      tickets.push({
        ticket_id: i,
        ticket_no: `${i}`,
        ticket_status: `N/A`
      });
    }
    if (i >= 10 && i < 100) {
      tickets.push({
        ticket_id: i,
        ticket_no: `0${i}`,
        ticket_status: `N/A`
      });
    }
    if (i >= 0 && i < 10) {
      tickets.push({
        ticket_id: i,
        ticket_no: `00${i}`,
        ticket_status: `N/A`
      });
    }
  }

  let _tbody = '';
  for (var i = 0; i < tickets_count; i++) {
      _tbody += `<tr key="${i}">
                  <th><label class="checkbox"><input type="checkbox"><span class="checkbox-mark"></span></label></th>
                  <td>${tickets[i].ticket_no}</td>
                  <td>${tickets[i].ticket_status}</td>
                  <th><div class="button is-borderless is-square is-rounded">···</div></th>
                </tr>`;
  }
  $("#tickets").find('tbody').html(_tbody);
}

// // repeat with the interval of 2 seconds
// let timerId = setInterval(() => alert('tick'), 2000);

// // after 5 seconds stop
// setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

// let timerId = setTimeout(function tick() {
//   alert('tick');
//   timerId = setTimeout(tick, 2000); // (*)
// }, 2000);

// let clapSound;

// function preload() {
//   // soundFormats('mp3', 'ogg');
//   // soundFile = loadSound('assets/beatbox.ogg');
//   clapSound = loadSound('sounds/clap.mp3');
// }

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // ellipse(50,50,80,80);
}

function mousePressed() {
}




// Bubble class
class Bubble {
  constructor(x, y, diameter, name) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.name = name;

    this.over = false;
  }

  // Check if mouse is over the bubble
  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    this.over = d < this.radius;
  }

  // Display the Bubble
  display() {
    stroke(0);
    strokeWeight(0.8);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      fill(0);
      textAlign(CENTER);
      text(this.name, this.x, this.y + this.radius + 20);
    }
  }
}

let table; // Global object to hold results from the loadTable call
let bubbles = []; // Global array to hold all bubble objects

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload() {
  table = loadTable("assets/bubbles.csv", "header");
}

// Convert saved Bubble data into Bubble Objects
function loadData() {
  const bubbleData = table.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  const length = table.getRowCount();

  for (let i = 0; i < length; i++) {
    // Get position, diameter, name,
    const x = bubbleData[i].getNum("x");
    const y = bubbleData[i].getNum("y");
    const diameter = bubbleData[i].getNum("diameter");
    const name = bubbleData[i].getString("name");

    // Put object in array
    bubbles.push(new Bubble(x, y, diameter, name));
  }
}

// Create a new Bubble each time the mouse is clicked.
function mousePressed() {
  // Create a new row
  let row = table.addRow();

  let name = "New Bubble";
  let diameter = random(40, 80);

  // Set the values of that row
  row.setNum("x", mouseX);
  row.setNum("y", mouseY);
  row.setNum("diameter", diameter);
  row.setString("name", name);

  bubbles.push(new Bubble(mouseX, mouseY, diameter, name));

  // If the table has more than 10 rows
  if (table.getRowCount() > 10) {
    // Delete the oldest row
    table.removeRow(0);
    bubbles.shift();
  }
}

function setup() {
  createCanvas(640, 360);
  loadData();
}

function draw() {
  background(255);

  // Display all bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
  }

  // Label directions at bottom
  textAlign(LEFT);
  fill(0);
  text("Click to add bubbles.", 10, height - 10);
}
