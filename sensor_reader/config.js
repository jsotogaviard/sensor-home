/** InfluxDB v2 URL */
const url = process.env['INFLUX_URL'] || 'http://localhost:8086'
/** InfluxDB authorization token */
const token = process.env['INFLUX_TOKEN'] || 'token'
/** Organization within InfluxDB  */
const org = process.env['INFLUX_ORG'] || 'org'
/**InfluxDB bucket used in examples  */
const bucket = 'bucket'
// ONLY onboarding example
/**InfluxDB user  */
const username = 'admin'
/**InfluxDB password  */
const password = 'admin123'

export {
  url,
  token,
  org,
  bucket,
  username,
  password,
}