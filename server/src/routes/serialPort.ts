import { FastifyPluginCallback } from 'fastify'

type ComposedReply<T> = {
    '4xx': { msg: string }
    200: T
}

type AvailablePortsReply = ComposedReply<{ meta: string; data: string[] }>

const routes: FastifyPluginCallback = function (app, options, next) {
    app.get<{ Reply: AvailablePortsReply }>('/available-ports', async (request, reply) => {
        //TODO implement
        //reply.code(404).send({ msg: 'No available serial ports' })
        reply.code(200).send({ meta: '', data: ['COM1', 'COM2', 'COM3'] })
    })
    next()
}

export default routes
