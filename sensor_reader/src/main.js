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
    console.log("id " + ss.id)
    console.log("uuid " + ss.uuid)
    console.log("name " + ss.advertisement.localName)
    if(ss.advertisement.serviceData && ss.advertisement.serviceData.length > 0)
      console.log("serviceData " + JSON.stringify(ss.advertisement.serviceData[0]))
    if(ss.advertisement.manufacturerData)
      console.log("manufacturerData " + JSON.stringify(ss.advertisement.manufacturerData))
  }
});

// Stop scanning after scanning time
setTimeout(async () => {
  console.log(JSON.stringify(Object.keys(sensors)))
  // Stop scanning
  noble.stopScanning()
  const miScale = s['c8478cf8ac47']
 
    const ss = miScale
    console.log("id " + ss.id)
    console.log("uuid " + ss.uuid)
    console.log("name " + ss.advertisement.localName)
    if(ss.advertisement.serviceData && ss.advertisement.serviceData.length > 0)
      console.log("serviceData " + JSON.stringify(ss.advertisement.serviceData[0]))
    if(ss.advertisement.manufacturerData)
      console.log("manufacturerData " + JSON.stringify(ss.advertisement.manufacturerData))
 
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