import { InfluxDB, Point, HttpError } from '@influxdata/influxdb-client'
import { url, token, org, bucket } from '../config'


export function writeSensorData(knownSensors) {
    console.log('*** WRITE POINTS ***')
    // create a write API, expecting point timestamps in nanoseconds (can be also 's', 'ms', 'us')
    const writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, 'ns')
    // setup default tags for all writes through this API
    //writeApi.useDefaultTags({location: hostname()})
    const now = new Date()
    for (const idx in knownSensors) {
        // write point with a custom timestamp
        const knownSensor = knownSensors[idx]
        const point2 = new Point('sensor_data')
            .tag('room', knownSensor.mac)
            .floatField('temperature',knownSensor.temperature)
            .intField('humidity',knownSensor.humidity)
            .intField('battery_percentage',knownSensor.battery_percentage)
            .intField('battery_millivolts',knownSensor.battery_millivolts)
            .intField('counter',knownSensor.counter)
            .timestamp(now) // can be also a number, but in writeApi's precision units (s, ms, us, ns)!
        writeApi.writePoint(point2)
        console.log(` ${point2.toLineProtocol(writeApi)}`)
    }
    // WriteApi always buffer data into batches to optimize data transfer to InfluxDB server and retries
    // writing upon server/network failure. writeApi.flush() can be called to flush the buffered data,
    // close() also flushes the remaining buffered data and then cancels pending retries.
    writeApi
        .close()
    
}

export function readSensorData(){
    const queryApi = new InfluxDB({url, token}).getQueryApi(org)
    const fluxQuery =
      'from(bucket:"jso") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")'
    
    console.log('*** QUERY ROWS ***')
    // Execute query and receive table metadata and rows.
    // https://v2.docs.influxdata.com/v2.0/reference/syntax/annotated-csv/
    queryApi.queryRaw(fluxQuery)
   .then(result => {
     console.log(result)
     console.log('\nQueryRaw SUCCESS')
   })
   .catch(error => {
     console.error(error)
     console.log('\nQueryRaw ERROR')
   })
}