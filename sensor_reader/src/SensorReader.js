export function parseAdvData(peripheral) {
  const serviceData = peripheral.advertisement.serviceData
  const manufacturer_service_data_hex = Buffer.from(serviceData[0].data).toString("hex")
  const thermometer = {}
  thermometer.id = peripheral.id // id == mac
  thermometer.uuid = serviceData[0].uuid //"181a"
  thermometer.mac = manufacturer_service_data_hex.substring(0, 12)
  thermometer.temperature = parseInt(manufacturer_service_data_hex.substring(12, 12 + 4), 16) / 10
  thermometer.humidity = parseInt(manufacturer_service_data_hex.substring(12 + 4, 12 + 4 + 2), 16)
  thermometer.battery_percentage = parseInt(manufacturer_service_data_hex.substring(12 + 4 + 2, 12 + 4 + 2 + 2), 16)
  thermometer.battery_millivolts = parseInt(manufacturer_service_data_hex.substring(12 + 4 + 2 + 2, 12 + 4 + 2 + 2 + 4), 16)
  thermometer.counter = parseInt(manufacturer_service_data_hex.substring(12 + 4 + 2 + 2 + 4, 12 + 4 + 2 + 2 + 4 + 2), 16)
  return thermometer;
}

export function isKnownSensor(peripheral) {
  return peripheral.advertisement && peripheral.advertisement.serviceData && peripheral.advertisement.serviceData.length > 0 && peripheral.advertisement.serviceData[0].uuid == "181a";
}

export function getKnownSensors(sensors) {
  const knownSensors = []
  sensors.forEach((sensor,key) => {
    if(isKnownSensor(sensor)){
      const knownSensor = parseAdvData(sensor)
      knownSensors.push(knownSensor)
    }
  });
  return peripheral.advertisement && peripheral.advertisement.serviceData && peripheral.advertisement.serviceData.length > 0 && peripheral.advertisement.serviceData[0].uuid == "181a";
}