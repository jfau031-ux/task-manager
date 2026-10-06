import type { FastifyInstance } from 'fastify';
import { TaskController } from '../controllers/task.controller.js';

interface CreateTaskBody {
  title: string;
  description?: string | null;
  completed?: boolean;
}

interface TaskRouteOptions {
  controller: TaskController;
}

export async function taskRoutes(app: FastifyInstance, options: TaskRouteOptions) {
  app.post<{ Body: CreateTaskBody }>(
    '/tasks',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              minLength: 1,
            },
            description: {
              anyOf: [{ type: 'string' }, { type: 'null' }],
            },
            completed: {
              type: 'boolean',
            },
          },
          additionalProperties: false,
        },
      },
    },
    (request, reply) => options.controller.create(request, reply),
  );
}
