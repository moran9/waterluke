import { app } from './app'
import { openSerialPort, closeSerialPort } from './serialPort'

// Connect to serial port
openSerialPort()
setTimeout(closeSerialPort, 5000)

// Start server
app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
