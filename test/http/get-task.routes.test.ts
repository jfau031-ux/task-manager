import Fastify from 'fastify';
import { describe, expect, it } from 'vitest';
import { CreateTask } from '../../src/application/use-cases/create-task.js';
import { GetTask } from '../../src/application/use-cases/get-task.js';
import type { Task } from '../../src/domain/entities/task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';
import { TaskController } from '../../src/presentation/http/controllers/task.controller.js';
import { taskRoutes } from '../../src/presentation/http/routes/task.routes.js';

function createTestApp(task: Task | null) {
  const repository: TaskRepository = {
    findAll: async () => [],
    findById: async () => task,
    create: async (newTask) => ({
      id: 2,
      ...newTask,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
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

describe('GET /tasks/:id', () => {
  it('should return a task and status 200 when it exists', async () => {
    const task: Task = {
      id: 1,
      title: 'Learn TypeScript',
      description: 'Study application architecture',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const app = createTestApp(task);

    const response = await app.inject({
      method: 'GET',
      url: '/tasks/1',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      id: 1,
      title: 'Learn TypeScript',
      description: 'Study application architecture',
      completed: false,
    });

    await app.close();
  });

  it('should return 404 when the task does not exist', async () => {
    const app = createTestApp(null);

    const response = await app.inject({
      method: 'GET',
      url: '/tasks/999',
    });

    expect(response.statusCode).toBe(404);

    await app.close();
  });

  it('should return 400 when the id has an invalid type', async () => {
    const app = createTestApp(null);

    const response = await app.inject({
      method: 'GET',
      url: '/tasks/abc',
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });
});
