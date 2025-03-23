/**
 * Ticket model
 */
class Ticket {
  constructor(id, number, status, price) {
    this.ticket_id = id;
    this.ticket_no = number;
    this.ticket_status = status;
    this.ticket_price = price;
    this.barcode_text = "";
    this.barcode = "";

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
  
  toObject() {
    return {
      'ticket_id': this.ticket_id,
      'ticket_no': this.ticket_no,
      'ticket_status': this.ticket_status,
      'ticket_price': this.ticket_price,
      'barcode_text': this.barcode_text,
      'barcode': this.barcode
    };
  }
}


export default Ticket;