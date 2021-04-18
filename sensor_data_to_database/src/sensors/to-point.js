import XiaomiMiScale from "./xiaomi-mi-scale.js"
import XiamiMijiaThermometer from "./xiaomi-mijia-thermometer.js"

function toPoint(peripheral){
    if(!peripheral)
        return
    if(!peripheral.advertisement)
        return
    if (!peripheral.advertisement.serviceData)
        return
    if (peripheral.advertisement.serviceData.length == 0)
        return
    
    const uuid = peripheral.advertisement.serviceData[0].uuid
    switch (uuid) {
        case XiamiMijiaThermometer.XIAOMI_MIJIA_THERMOMETER_UUID:
            return XiamiMijiaThermometer.toPoint(peripheral);
        case XiaomiMiScale.XIAOMI_MI_SCALE_UUID:        
            return XiaomiMiScale.toPoint(peripheral);
        default:
            console.log("Unknown uuid " + uuid)
            return
    }
}

export {toPoint}