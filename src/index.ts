import { fastify, FastifyInstance } from 'fastify';
import { SerialPort } from 'serialport';
import readline from 'readline';

const server: FastifyInstance = fastify();

type IQuerystring = {
    username: string;
    password: string;
};

type IHeaders = {
    'h-Custom': string;
};

type BasicReply = {
    200: { success: boolean };
    302: { url: string };
    '4xx': { error: string };
};

type IReply = BasicReply | string;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});

server.get<{
    Querystring: IQuerystring;
    Headers: IHeaders;
    Reply: IReply;
}>(
    '/auth',
    {
        preValidation: (request, reply, done) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { username, password } = request.query;
            done(username !== 'admin' ? new Error('Must be admin') : undefined); // only validate `admin` account
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (request, reply) => {
        //const customerHeader = request.headers['h-Custom'];
        // do something with request data
        return `logged in!`;
    },
);

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

// SERIAL PORT TEST ////////////////////////////////////////////////////////

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 115200, // o 9600
    autoOpen: false,
});

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }

    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on');
});

// The open event is always emitted
port.on('open', function () {
    // open logic
});

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

rl.on('history', (history) => {
    console.log(`Received history: ${history}`);
});

rl.on('close', () => {
    // close logic
});
