import { InfluxDB } from '@influxdata/influxdb-client'
import { url, token, org, bucket } from '../config.js'

/**
 * Write to influx
 * 
 * @param {*} knownSensors 
 */
function write2influx(point) {
  const writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, 'ns')
  writeApi.writePoint(point)
  console.log(`${point.toLineProtocol(writeApi)}`)
}

export { write2influx }

