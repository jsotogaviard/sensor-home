import { Point } from '@influxdata/influxdb-client'

export default class XiaomiMijiaThermometer {

    static XIAOMI_MIJIA_THERMOMETER_UUID = '181a'
    static THERMOMETER_DATABASE = 'thermometer_data'

    static toPoint(peripheral) {

        const serviceData = peripheral.advertisement.serviceData
        const serviceDataHex = Buffer.from(serviceData[0].data).toString("hex")
        const mac = serviceDataHex.substring(0, 12)
        const temperature = parseInt(serviceDataHex.substring(12, 12 + 4), 16) / 10
        const humidity = parseInt(serviceDataHex.substring(12 + 4, 12 + 4 + 2), 16)
        const batteryPercentage = parseInt(serviceDataHex.substring(12 + 4 + 2, 12 + 4 + 2 + 2), 16)
        const batteryMillivolts = parseInt(serviceDataHex.substring(12 + 4 + 2 + 2, 12 + 4 + 2 + 2 + 4), 16)
        const counter = parseInt(serviceDataHex.substring(12 + 4 + 2 + 2 + 4, 12 + 4 + 2 + 2 + 4 + 2), 16)
        const rssi = peripheral.rssi

        const coeff = 1000 * 60 * 5;
        const now = new Date();
        const closestFiveMinutes = new Date(Math.round(now.getTime() / coeff) * coeff)
        const point = new Point(this.THERMOMETER_DATABASE)
            .tag('room', mac)
            .floatField('temperature', temperature)
            .intField('humidity', humidity)
            .intField('battery_percentage', batteryPercentage)
            .intField('battery_millivolts', batteryMillivolts)
            .intField('counter', counter)
            .floatField('rssi', rssi)
            .timestamp(closestFiveMinutes)

        return point
    }

}