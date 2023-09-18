import { fastify, FastifyInstance } from 'fastify'

const server: FastifyInstance = fastify()

interface IQuerystring {
    username: string;
    password: string;
  }
  
  interface IHeaders {
    'h-Custom': string;
  }
  
  type IReply = {
    200: { success: boolean };
    302: { url: string };
    '4xx': { error: string };
  }| string

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders,
    Reply: IReply
  }>('/auth', {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query
      done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
    }
  }, async (request, reply) => {
    const customerHeader = request.headers['h-Custom']
    // do something with request data
    return `logged in!`
  })

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})