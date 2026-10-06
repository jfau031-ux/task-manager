import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateTask } from '../../../application/use-cases/create-task.js';

interface CreateTaskBody {
  title: string;
  description?: string | null;
  completed?: boolean;
}

export class TaskController {
  constructor(private readonly createTask: CreateTask) {}

  async create(request: FastifyRequest<{ Body: CreateTaskBody }>, reply: FastifyReply) {
    const task = await this.createTask.execute({
      title: request.body.title,
      description: request.body.description ?? null,
      completed: request.body.completed ?? false,
    });

    return reply.code(201).send(task);
  }
}
