console.log(window.ticket)

console.log('👋 This message is being logged by "renderer.js", included via webpack');


window.ticket.insertOne({ticket_id: 1, ticket_no: 'MCS001', ticket_status: 'CHECKED-OUT', ticket_pattern: 'MCSXXX', ticket_price: 5, barcode_text: "", barcode: ""});

window.ticket.insertMany(
	[
		{ticket_id: 2, ticket_no: 'MCS002', ticket_status: 'CHECKED-OUT', ticket_pattern: 'MCSXXX', ticket_price: 5, barcode_text: "", barcode: ""},
		{ticket_id: 3, ticket_no: 'MCS003', ticket_status: 'CHECKED-OUT', ticket_pattern: 'MCSXXX', ticket_price: 5, barcode_text: "", barcode: ""},
		{ticket_id: 4, ticket_no: 'MCS004', ticket_status: 'CHECKED-OUT', ticket_pattern: 'MCSXXX', ticket_price: 5, barcode_text: "", barcode: ""},
		{ticket_id: 5, ticket_no: 'MCS005', ticket_status: 'CHECKED-OUT', ticket_pattern: 'MCSXXX', ticket_price: 5, barcode_text: "", barcode: ""},
		{ticket_id: 6, ticket_no: 'MCS006', ticket_status: 'CHECKED-OUT', ticket_pattern: 'MCSXXX', ticket_price: 5, barcode_text: "", barcode: ""}
	]
)

import './index.jsx';
import './index.css';