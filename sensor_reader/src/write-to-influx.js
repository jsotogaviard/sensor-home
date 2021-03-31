import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { url, token, org, bucket } from '../config'

/**
 * Write to influx
 * 
 * @param {*} knownSensors 
 */
function write2influx(knownSensors) {
  const writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, 'ns')
  const now = new Date()
  for (const idx in knownSensors) {
    const knownSensor = knownSensors[idx]
    const point = new Point('sensor_data')
      .tag('room', knownSensor.mac)
      .floatField('temperature', knownSensor.temperature)
      .intField('humidity', knownSensor.humidity)
      .intField('battery_percentage', knownSensor.battery_percentage)
      .intField('battery_millivolts', knownSensor.battery_millivolts)
      .intField('counter', knownSensor.counter)
      .floatField('rssi', knownSensor.rssi)
      .timestamp(now)
    writeApi.writePoint(point)
    console.log(`${point.toLineProtocol(writeApi)}`)
  }
  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })

}

export { write2influx }

