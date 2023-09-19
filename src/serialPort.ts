import { SerialPort } from 'serialport';
import readline from 'readline';

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 115200,
    autoOpen: false,
});

export const openSerialPort = function openPort(): void {
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        // open port logic
        console.log('Serial port open.');
    });
};

export const closeSerialPort = function closePort(): void {
    port.close(() => {
        // close port logic
    });
    console.log('Serial port closed.');
};

// The open event is always emitted
port.on('open', function () {});

const rl = readline.createInterface({
    input: port,
    crlfDelay: Infinity,
    terminal: true,
    history: [],
    historySize: 3,
});

rl.on('line', (input) => {
    console.log(`Received line: ${input}`);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
rl.on('history', (history) => {
    // console.log(`Received history: ${history}`);
});

rl.on('close', () => {
    // close readline logic
});
