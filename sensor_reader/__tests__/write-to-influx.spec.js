import { write2influx } from "../src/write-to-influx"
import { url, token, org, bucket } from '../config'
import { InfluxDB } from '@influxdata/influxdb-client'

/**
 * This tests a influx database on localhost 8086
 * 
 */
describe("Write sensor data to influx", () => {
    test("write sensor data to influx ", done => {
        const knownSensor = {}
        knownSensor.id = "a4c138ab5905"
        knownSensor.uuid = "181a"
        knownSensor.mac = "a4c138ab5905"
        knownSensor.temperature = 16.2
        knownSensor.humidity = 66
        knownSensor.battery_percentage = 85
        knownSensor.battery_millivolts = 2975
        knownSensor.counter = 99

        write2influx([knownSensor])
        const queryApi = new InfluxDB({ url, token }).getQueryApi(org)
        const fluxQuery ='from(bucket:"'+ bucket + '") |> range(start: 0) |> filter(fn: (r) => r["_field"] == "temperature")'

        console.log('*** QUERY ROWS ***')
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

