#!/usr/bin/env node
let HID = require('node-hid');
let usb = require('usb');
// let usb = require('node-usb');

// Linux: choose driverType
// default is 'hidraw', can also be 'libusb'
// if( process.argv[2] ) {
//     let type = process.argv[2];
//     console.log("driverType:",type);
//     HID.setDriverType( type );
// }

// let devices = HID.devices();
// console.log('devices:', devices);

// let deviceInfo = devices.find( function(d) {
//     let isTeensy = d.vendorId===0x16C0 && d.productId===0x0486;
//     return isTeensy && d.usagePage===0xFFAB && d.usage===0x200;
// });
// if( deviceInfo ) {
//   let device = new HID.HID( deviceInfo.path );
//   console.log(device)
// }

console.log(usb.getDeviceList())

const device = usb.findByIds(0x04d8, 0x003f);
if (device) {
  device.open();
  device.interfaces[0].claim();

  device.interfaces[0].endpoints[0].startPoll(1, 8);
  device.interfaces[0].endpoints[0].on('data', (data) => {
    console.log('Received data: ', data);
  })
}
else {
  console.error('Device not found');
}
