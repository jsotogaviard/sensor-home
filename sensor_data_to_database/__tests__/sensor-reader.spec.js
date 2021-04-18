import { getKnownSensors } from "../src/sensor-reader";

function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    } else {
        var a = [];
        for (var i = 0, len = str.length; i < len; i += 2) {
            a.push(parseInt(str.substr(i, 2), 16));
        }
        return new Uint8Array(a);
    }
}

describe("A sensor reader module", () => {
    test("Not a known sensor ", () => {
        const peripheral = {
            id: 'a4c138ab5905',
            advertisement: {
                serviceData: [
                    {
                        uuid: '181b',
                        data: hexStringToByte("a4c138ab590500a242550b9f63"),
                    }
                ]
            }
        }
        const knownSensors = getKnownSensors({ 'a4c138ab5905': peripheral })
        expect(knownSensors.length).toEqual(0);
    });
    test("A known sensor ", () => {
        const peripheral = {
            id: 'a4c138ab5905',
            advertisement: {
                serviceData: [
                    {
                        uuid: '181a',
                        data: hexStringToByte("a4c138ab590500a242550b9f63"),
                    }
                ]
            }
        }
        const knownSensors = getKnownSensors({ 'a4c138ab5905': peripheral })
        expect(knownSensors.length).toEqual(1);
    });
    test("Transform into known sensor", () => {
        const peripheral = {
            id: 'a4c138ab5905',
            advertisement: {
                serviceData: [
                    {
                        uuid: '181a',
                        data: hexStringToByte("a4c138ab590500a242550b9f63"),
                    }
                ]
            }
        }
        const knownSensors = getKnownSensors({ 'a4c138ab5905': peripheral })
        expect(knownSensors.length).toEqual(1);
        const knownSensor = knownSensors[0]
        expect(knownSensor.id).toEqual("a4c138ab5905");
        expect(knownSensor.uuid).toEqual("181a");
        expect(knownSensor.mac).toEqual("a4c138ab5905");
        expect(knownSensor.temperature).toEqual(16.2);
        expect(knownSensor.humidity).toEqual(66);
        expect(knownSensor.battery_percentage).toEqual(85);
        expect(knownSensor.battery_millivolts).toEqual(2975);
        expect(knownSensor.counter).toEqual(99);
    });
    describe("A scale module", () => {
        test("Not a known sensor ", () => {
            const weightingTime = Date.UTC(2021, 3, 18, 18, 14, 47)
            const currentOffset = moment.tz('Europe/Paris').utcOffset() * 60 * 1000// current offset in milli seconds
            const weightingTimeOffset = weightingTime + currentOffset
            // 1618769687000
            // Sunday 18 April 2021 18:14:47
            console.log(weightingTimeOffset)
            //expect(knownSensors.length).toEqual(0);
        });
    });
});

