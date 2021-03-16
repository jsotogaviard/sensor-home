import noble from '@abandonware/noble'
import {getKnownSensors} from './SensorReader'
import {writeSensorData} from './influxDBwrite'

const sensors = {}



noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', peripheral => {
  if(!sensors[peripheral.id]){
    sensors[peripheral.id] = peripheral  
  }
});

setTimeout(() => {
  noble.stopScanning()

  const knownSensors = getKnownSensors(sensors)
  writeSensorData(knownSensors)
  
}, 10000);