import noble from '@abandonware/noble'
import async from 'async'
import { getKnownSensors } from './sensor-reader'
import { write2influx } from './write-to-influx'

// All sensors captured in elapsed time
const sensors = {}

// Start scanning
noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

// Store all discovered peripherals
noble.on('discover', peripheral => {
  if (peripheral.id == 'c8478cf8ac47') {
    console.log("id " + peripheral.id)
    console.log("uuid " + peripheral.uuid)
    console.log("name " + peripheral.advertisement.localName)
    if(peripheral.advertisement.serviceData && peripheral.advertisement.serviceData.length > 0)
      console.log("serviceData " + JSON.stringify(peripheral.advertisement.serviceData[0]))
    if(peripheral.advertisement.manufacturerData)
      console.log("manufacturerData " + JSON.stringify(peripheral.advertisement.manufacturerData))
    const serviceData = peripheral.advertisement.serviceData
    const manufacturer_service_data_hex = Buffer.from(serviceData[0].data).toString("hex")
    console.log("manufacturer_service_data_hex")
    console.log(manufacturer_service_data_hex)
    console.log(serviceData[0].data.length)
    const manufacturer_data_hex = Buffer.from(peripheral.advertisement.manufacturerData).toString("hex")
    console.log("manufacturer_data_hex")
    console.log(manufacturer_data_hex)
    console.log(peripheral.advertisement.manufacturerData.length)
    const scale = {}
    scale.id = peripheral.id // id == mac
    scale.uuid = serviceData[0].uuid //"181d"
    scale.control_bit = manufacturer_service_data_hex.substring(0, 2)
    scale.control_bit_01 = parseInt(manufacturer_service_data_hex.substring(0, 2),16).toString(2)
    let index = 7
    scale.IsWeightRemoved = scale.control_bit_01[index--] == "1"
    scale.uknown6 = scale.control_bit_01[index--] == "1"
    scale.IsStabilized = scale.control_bit_01[index--] == "1"
    scale.IsCatty = scale.control_bit_01[index--] == "1"
    scale.uknown3 = scale.control_bit_01[index--] == "1"
    scale.uknown2 = scale.control_bit_01[index--] == "1"
    scale.uknown1 = scale.control_bit_01[index--] == "1"
    scale.IsLBS = scale.control_bit_01[index--] == "1"
    scale.weight = parseInt(manufacturer_service_data_hex.substring(4, 6) + manufacturer_service_data_hex.substring(2, 4), 16)  * 0.01 /2
    if(scale.IsStabilized && scale.IsWeightRemoved) 
      scale.weightok = scale.weight
    
    console.log(JSON.stringify(scale))
  }
});

// Stop scanning after scanning time
setTimeout(async () => {
  //console.log(JSON.stringify(Object.keys(sensors)))
  // Stop scanning
  //noble.stopScanning()
   
  // Retrieve known sensors and write them in influx
  /*const knownSensor = sensors["a4c138a8554e"]
  if (knownSensor)
    await explore(knownSensor)*/

}, process.argv[2] || 5000); // TODO add env variable for scanning time


async function explore(peripheral) {
  console.log('services and characteristics:' + JSON.stringify(peripheral.id));

  peripheral.on('disconnect', function () {
    console.log("disconnect")
    process.exit(0);
  });

  peripheral.connect(function (error) {
    console.log("connected")
    peripheral.discoverAllServicesAndCharacteristics(function (error, services, characteristics) {
      console.log("discoverAllServicesAndCharacteristics")
      console.log("Services " + services.length)
      console.log("Characterisitcs " + characteristics.length)
      console.log(characteristics)
      for(const characteristic in characteristics){
        console.log(characteristics[characteristic])
        /*characteristic.read((error, data) => {
          console.log(error)
          console.log(data)
        })*/
      }
    })
  })
}