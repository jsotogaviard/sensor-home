import noble from '@abandonware/noble';
import { write2influx } from './write-to-influx.js'
import { toPoint } from './sensors/to-point.js'

// Start scanning
noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

// If it is a known sensor, write it to the database
noble.on('discover', peripheral => {
  const point = toPoint(peripheral)
  if (point)
    write2influx(point)
});


