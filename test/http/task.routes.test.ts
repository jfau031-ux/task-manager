import Fastify from 'fastify';
import { describe, expect, it } from 'vitest';
import { CreateTask } from '../../src/application/use-cases/create-task.js';
import { GetTask } from '../../src/application/use-cases/get-task.js';
import type { Task } from '../../src/domain/entities/task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';
import { TaskController } from '../../src/presentation/http/controllers/task.controller.js';
import { taskRoutes } from '../../src/presentation/http/routes/task.routes.js';

function createTestApp() {
  const createdTask: Task = {
    id: 1,
    title: 'Learn Fastify',
    description: 'Build the HTTP API',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const repository: TaskRepository = {
    findAll: async () => [],
    findById: async () => null,
    create: async () => createdTask,
    update: async () => null,
    delete: async () => false,
  };

  const createTask = new CreateTask(repository);
  const getTask = new GetTask(repository);
  const controller = new TaskController(createTask, getTask);

  const app = Fastify({
    ajv: {
      customOptions: {
        coerceTypes: false,
      },
    },
  });

  app.register(taskRoutes, {
    controller,
  });

  return app;
}

describe('POST /tasks', () => {
  it('should create a task and return 201', async () => {
    const app = createTestApp();

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 'Learn Fastify',
        description: 'Build the HTTP API',
        completed: false,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      id: 1,
      title: 'Learn Fastify',
      description: 'Build the HTTP API',
      completed: false,
    });

    await app.close();
  });

  it('should return 400 when title is missing', async () => {
    const app = createTestApp();

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        description: 'Build the HTTP API',
      },
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });

  it('should return 400 when title has an invalid type', async () => {
    const app = createTestApp();

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 123,
      },
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });

  it('should return 400 when completed has an invalid type', async () => {
    const app = createTestApp();

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 'Learn Fastify',
        completed: 'yes',
      },
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });
});
