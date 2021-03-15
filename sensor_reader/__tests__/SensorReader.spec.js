import { isKnownSensor, parseAdvData } from "../src/SensorReader";

function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
    }

    return new Uint8Array(a);
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
        expect(isKnownSensor(peripheral)).toEqual(false);
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
        expect(isKnownSensor(peripheral)).toEqual(true);
    });
    test("Transform into known sensor ", () => {
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
        const knownSensor = parseAdvData(peripheral)
        expect(knownSensor.id).toEqual("a4c138ab5905");
        expect(knownSensor.uuid).toEqual("181a");
        expect(knownSensor.mac).toEqual("a4c138ab5905");
        expect(knownSensor.temperature).toEqual(16.2);
        expect(knownSensor.humidity).toEqual(66);
        expect(knownSensor.battery_percentage).toEqual(85);
        expect(knownSensor.battery_millivolts).toEqual(2975);
        expect(knownSensor.counter).toEqual(99);
    });
});

