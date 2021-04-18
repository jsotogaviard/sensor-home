import { Point } from '@influxdata/influxdb-client'
import moment from 'moment-timezone';

export default class XiaomiMiScale {

    static XIAOMI_MI_SCALE_UUID = '181d'
    static SCALE_DATABASE = 'scale_data'
    static ARMANCE = 'armance'
    static JONATHAN = 'jonathan'

    static getPerson(weight) {
        if(weight < 70){
            return this.ARMANCE
        } else {
            return this.JONATHAN
        }
    }

    static toPoint(peripheral) {

        const serviceData = peripheral.advertisement.serviceData
        const serviceDataHex = Buffer.from(serviceData[0].data).toString("hex")
        const controlBit = parseInt(serviceDataHex.substring(0, 2), 16)
        const weightRemoved = (controlBit >>> 7) & 0x01
        const stable = (controlBit >>> 5) & 0x01
        
        // Weight is removed or it is not stable
        // we do not have a measurement
        if (weightRemoved || !stable) 
            return

        // We have a definitive weight
        const rawWeight = parseInt(serviceDataHex.substring(4, 6) + serviceDataHex.substring(2, 4), 16)

        // What type of weight is it ?
        const catty = (controlBit >>> 4) & 0x01
        const lbs = (controlBit >>> 0) & 0x01
        let weight
        if (catty || lbs) {
            // Weight in lbs (english) or catty (chinese)
            weight = rawWeight / 100
        } else {
            // KG
            weight = rawWeight / 200
        }
        const year = parseInt(serviceDataHex.substring(8, 10) + serviceDataHex.substring(6, 8), 16)
        const month = parseInt(serviceDataHex.substring(10, 12), 16)
        const day = parseInt(serviceDataHex.substring(12, 14), 16)
        const hour = parseInt(serviceDataHex.substring(14, 16), 16)
        const minute = parseInt(serviceDataHex.substring(16, 18), 16)
        const second = parseInt(serviceDataHex.substring(18, 20), 16)
        const weighingTime = Date.UTC(year, month - 1, day, hour, minute, second)
        const weighingDate = moment.tz(weighingTime, "Europe/Paris")
        const point = new Point(this.SCALE_DATABASE)
            .tag('person', this.getPerson(weight))
            .floatField('weight', weight)
            .timestamp(weighingDate.unix())
        return point
    }

}