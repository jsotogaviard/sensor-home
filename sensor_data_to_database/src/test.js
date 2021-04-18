import moment from 'moment-timezone';

const weightingTime = Date.UTC(2021, 3, 18, 18, 14, 47)
const currentOffset = moment.tz('Europe/Paris').utcOffset() * 60 * 1000// current offset in milli seconds
const weightingTimeOffset = weightingTime - currentOffset
console.log(weightingTimeOffset)
console.log(new Date(weightingTime))
console.log(new Date(weightingTimeOffset))



