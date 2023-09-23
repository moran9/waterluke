import serialPort, { SerialPortMock } from 'serialport'
import { openSerialPort } from '../src/serialPort'
import { sleep } from './utils/sleep'

// Override the serialport export so a mocked constructor is used instead
jest.mock('serialport', () => {
    let port: SerialPortMock
    return {
        ...jest.requireActual('serialport'),
        SerialPort: jest.fn().mockImplementation((options) => {
            const path = '/dev/ttyACM0'
            SerialPortMock.binding.createPort(path)
            port = new SerialPortMock(options)
            port.on('open', async () => {
                port.port?.emitData('Simulating data received from serial port\r\n')
                await sleep(1000) // Give time to the data to be emited before closing the serial port
                port.close()
            })
            return port
        }),
        getPort: () => port,
    }
})

let logSpy: jest.SpyInstance

beforeAll(async () => {
    logSpy = jest.spyOn(console, 'log')
})

afterAll(() => {
    logSpy.mockClear()
})

test('should receive data from serial port', (done) => {
    const port = (serialPort as any).getPort()
    openSerialPort()
    port.on('close', () => {
        expect(logSpy).toHaveBeenCalledWith('Simulating data received from serial port')
        done()
    })
})
