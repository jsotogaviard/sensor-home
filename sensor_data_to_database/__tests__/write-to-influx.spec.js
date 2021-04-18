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

        // TODO how to query with old iql
        const queryApi = new InfluxDB({ url, token }).getQueryApi(org)
        const fluxQuery ='select * on ' + bucket
        queryApi.queryRaw(fluxQuery)
            .then(result => {
                console.log(result)
                console.log('\nQueryRaw SUCCESS')
                done()
            })
            .catch(error => {
                console.error(error)
                fail('it should not reach here');
                done()
            })
    })
})

