import noble from '@abandonware/noble'

console.log("hello world")

noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        console.log("poweredOn")
      noble.startScanning();
    } else {
        console.log("poweredOff")
      noble.stopScanning();
    }
  });
  
  noble.on('discover', function (peripheral) {
    serviceData = peripheral.advertisement.serviceData
    manufacturer_service_data_hex = serviceData[0].data.toString('hex') //a4c138ab590500a53f550b9b72" //mac a4c138ab5905
    thermometer = {}
    thermometer.id = peripheral.id // id == mac
    thermometer.uuid = serviceData[0].uuid //"181a"
    thermometer.mac =  manufacturer_service_data_hex.substring(0,12)
    thermometer.temperature = int(manufacturer_service_data_hex(12,12 + 4), 16) / 10
    thermometer.humidity =  int(manufacturer_service_data_hex(12 + 4,12 + 4 + 2), 16)
    thermometer.battery_percentage =  int(manufacturer_service_data_hex(12 + 4 + 2,12 + 4 + 2 + 2), 16)
    thermometer.battery_millivolts = int(manufacturer_service_data_hex(12 + 4 + 2 + 2,12 + 4 + 2 + 2 + 4), 16)
    thermometer.counter =  int(manufacturer_service_data_hex(12 + 4 + 2 + 2 + 4,12 + 4 + 2 + 2 + 4 + 2), 16)
    console.log(JSON.stringify(thermometer))
  });