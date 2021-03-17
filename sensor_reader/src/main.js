import noble from '@abandonware/noble'
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
  if (!sensors[peripheral.id]) {
    sensors[peripheral.id] = peripheral
  }
});

// Stop scanning after scanning time
setTimeout(() => {

  // Stop scanning
  noble.stopScanning()

  // Retrieve known sensors and write them in influx
  const knownSensors = getKnownSensors(sensors)
  write2influx(knownSensors)

}, process.env.SCANNING_TIME_MS || 5000); // TODO add env variable for scanning time