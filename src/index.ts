import { fastify, FastifyInstance } from 'fastify';
import { openSerialPort, closeSerialPort } from './serialPort';

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

    // Stablish connection with serial port
    openSerialPort();
    setTimeout(closeSerialPort, 5000);
});
