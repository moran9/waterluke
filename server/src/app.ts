import { fastify, FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import serialPortRoutes from './routes/serialPort'

export const app: FastifyInstance = fastify({ logger: true }).register(cors, {
    // put your options here
})

app.register(serialPortRoutes, { prefix: 'api/serial-port' })

type IQuerystring = {
    username: string
    password: string
}

type IHeaders = {
    'h-Custom': string
}

type BasicReply = {
    200: { success: boolean }
    302: { url: string }
    '4xx': { error: string }
}

type IReply = BasicReply | string

app.get<{
    Querystring: IQuerystring
    Headers: IHeaders
    Reply: IReply
}>(
    '/auth',
    {
        preValidation: (request, reply, done) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { username, password } = request.query
            done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (request, reply) => {
        //const customerHeader = request.headers['h-Custom'];
        // do something with request data
        return `logged in!`
    },
)

type MisHeaders = {
    'h-Cris': string
}
app.post<{ Body: number; Reply: string; Headers: MisHeaders }>('/auth', (request, reply) => {
    reply.code(401).send(request.body.toString())
})
