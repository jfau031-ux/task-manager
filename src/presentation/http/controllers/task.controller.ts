import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateTask } from '../../../application/use-cases/create-task.js';
import { NotFoundError } from '../../../application/errors/not-found.error.js';
import type { GetTask } from '../../../application/use-cases/get-task.js';

interface CreateTaskBody {
  title: string;
  description?: string | null;
  completed?: boolean;
}

interface GetTaskParams {
  id: string;
}

export class TaskController {
  constructor(
    private readonly createTask: CreateTask,
    private readonly getTask: GetTask,
  ) {}

  async create(request: FastifyRequest<{ Body: CreateTaskBody }>, reply: FastifyReply) {
    const task = await this.createTask.execute({
      title: request.body.title,
      description: request.body.description ?? null,
      completed: request.body.completed ?? false,
    });

    return reply.code(201).send(task);
  }

  async get(request: FastifyRequest<{ Params: GetTaskParams }>, reply: FastifyReply) {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return reply.code(400).send({
        message: 'Invalid task id',
      });
    }

    try {
      const task = await this.getTask.execute({
        id,
      });

      return reply.code(200).send(task);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
