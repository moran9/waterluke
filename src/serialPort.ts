import { SerialPort } from 'serialport'
import readline from 'readline'

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 115200,
    autoOpen: false,
})

export const openSerialPort = function openPort(): void {
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }
        // open port logic
    })
}

export const closeSerialPort = function closePort(): void {
    port.close(() => {
        // close port logic
    })
}

port.on('open', function () {})
port.on('close', function () {})

// readline logic hereafter:

const rl = readline.createInterface({
    input: port,
    crlfDelay: Infinity,
    terminal: true,
    history: [],
    historySize: 3,
})

rl.on('line', (input) => {
    console.log(`${input}`)
})

rl.on('history', (/*history*/) => {})
rl.on('close', () => {})
