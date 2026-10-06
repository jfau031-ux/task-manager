import type { FastifyInstance } from 'fastify';
import type { CreateTask } from '../../../application/use-cases/create-task.js';

interface TaskRouteOptions {
  createTask: CreateTask;
}

export async function taskRoutes(app: FastifyInstance, options: TaskRouteOptions) {
  app.post('/tasks', async (request) => {
    const body = request.body as {
      title: string;
      description: string | null;
      completed: boolean;
    };

    return options.createTask.execute(body);
  });
}
