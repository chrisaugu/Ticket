#!/usr/bin/env node

var HID = require('node-hid');

// Linux: choose driverType
// default is 'hidraw', can also be 'libusb'
if( process.argv[2] ) {
    var type = process.argv[2];
    console.log("driverType:",type);
    HID.setDriverType( type );
}

var devices = HID.devices();
console.log('devices:', devices);

var deviceInfo = devices.find( function(d) {
    var isTeensy = d.vendorId===0x16C0 && d.productId===0x0486;
    return isTeensy && d.usagePage===0xFFAB && d.usage===0x200;
});
if( deviceInfo ) {
  var device = new HID.HID( deviceInfo.path );
  console.log(device)
}
console.log(devices.length);