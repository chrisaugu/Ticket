# Ticket by DWU-MCS

### Features
[x] multiple page
[x] generate ticket number
[x] seach ticket by number
[x] delete ticket by number
[] delete all ticket
[x] randomly pick a ticket
[x] list tickets
[x] import tickets from excel/csv
[x] produce stats for tickets
[] checked-in option

### ticket model
- ticket_id
- ticket_no
- status(CHECKED_IN)

### Tech stack
- electronjs
- sqlite

### Pages
- Dashboard
- Stats
- All

### logic
- initial status of ticket is "checked-out" hence initial value of ticket_status="checked-out"
- if the ticket is checked-in then mark the ticket as sold and update the ticket_status="checked-in"