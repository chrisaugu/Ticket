/**
 * Ticket model
 */
function Ticket(id, number, status, price) {  
  this.ticket_id = id;
  this.ticket_no = number;
  this.ticket_status = status;
  this.ticket_price = 0;
  this.barcode_text = "";
  this.barcode = "";
  this.ticket_type_id = 0;

  // let $this = this;

  // this.setStatus = (status) => {
  //   this.ticket_status = status;
  // }
  // this.getStatus = () => {
  //   return this.ticket_status;
  // }

  // this.setTicketId = (id) => {
  //   this.ticket_id = id;
  // }
  // this.getTicketId = () => {
  //   return this.ticket_id;
  // }
  // this.setTicketNo = (n) => {
  //   this.ticket_no = n;
  // }
  // this.getTicketNo = () => {
  //   return this.ticket_no;
  // }
}

export default Ticket;