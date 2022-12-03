/**
 * Parses CSV format to JSON format for easy manipulation of data
 */
export function parse_csv_to_json(body) {
  console.log("Parsing CSV to JSON");
  var i = [];
  for (var o = body.split(/\r\n|\n/), a = o[0].split(","), s = 1; s < o.length; s++) {
    var l = o[s].split(",");
    if (l.length === a.length) {
      for(var d = {}, u = 0; u < a.length; u++) d[a[u]] = l[u]; i.push(d)
    }
  }
  return i;
}


// function exportTableToCSV($table, filename) {
//     var $rows = $table.find('tr:has(td)'),

//     // Temporary delimiter characters unlikely to be typed by keyboard
//     // This is to avoid accidentally splitting the actual contents
//     tmpColDelim = String.fromCharCode(11), // vertical tab character
//     tmpRowDelim = String.fromCharCode(0), // null character

//     // actual delimiter characters for CSV format
//     colDelim = '","',
//     rowDelim = '"\r\n"',

//     // Grab text from table into CSV formatted string
//     csv = '"' + $rows.map(function (i, row) {
//         var $row = $(row),
//             $cols = $row.find('td');

//         return $cols.map(function (j, col) {
//             var $col = $(col),
//                 text = $col.text();

//             return text.replace(/"/g, '""'); // escape double quotes

//         }).get().join(tmpColDelim);

//     }).get().join(tmpRowDelim)
//         .split(tmpRowDelim).join(rowDelim)
//         .split(tmpColDelim).join(colDelim) + '"';

//     // Deliberate 'false', see comment below
//     if (false && window.navigator.msSaveBlob) {
//         var blob = new Blob([decodeURIComponent(csv)], {
//             type: 'text/csv;charset=utf8'
//         });

//         window.navigator.msSaveBlob(blob, filename);
//     } else if (window.Blob && window.URL) {
//         // HTML5 Blob        
//         var blob = new Blob([csv], { type: 'text/csv;charset=utf8' });
//         var csvUrl = URL.createObjectURL(blob);

//         $(this).attr({
//             'download': filename,
//             'href': csvUrl
//         });
//     } else {
//         // Data URI
//         var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

//         $(this).attr({
//             'download': filename,
//             'href': csvData,
//             'target': '_blank'
//         });
//     }
// }
