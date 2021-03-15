import { writeSensorData, readSensorData } from "../src/influxDBwrite"
import { url, token, org, bucket } from '../config'
import { InfluxDB, Point, HttpError } from '@influxdata/influxdb-client'

describe("Write sensor data", () => {
    test("write sensor data ", done => {
        const knownSensor = {}
        knownSensor.id = "a4c138ab5905"
        knownSensor.uuid = "181a"
        knownSensor.mac = "a4c138ab5905"
        knownSensor.temperature = 16.2
        knownSensor.humidity = 66
        knownSensor.battery_percentage = 85
        knownSensor.battery_millivolts = 2975
        knownSensor.counter = 99

        writeSensorData([knownSensor])
        const queryApi = new InfluxDB({ url, token }).getQueryApi(org)
        const fluxQuery =
            'from(bucket:"bucket") |> range(start: 0) |> filter(fn: (r) => r["_field"] == "temperature")'

        console.log('*** QUERY ROWS ***')
        // Execute query and receive table metadata and rows.
        // https://v2.docs.influxdata.com/v2.0/reference/syntax/annotated-csv/
        queryApi.queryRaw(fluxQuery)
            .then(result => {
                console.log(result)
                console.log('\nQueryRaw SUCCESS')
                done()
            })
            .catch(error => {
                console.error(error)
                console.log('\nQueryRaw ERROR')
                done()
            })
    })
})

