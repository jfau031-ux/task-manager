import Fastify from 'fastify';
import { CreateTask } from '../../application/use-cases/create-task.js';
import { GetTask } from '../../application/use-cases/get-task.js';
import type { TaskRepository } from '../../domain/repositories/task.repository.js';
import { PostgresTaskRepository } from '../../infrastructure/database/repositories/postgres-task.repository.js';
import { TaskController } from './controllers/task.controller.js';
import { healthRoutes } from './routes/health.routes.js';
import { taskRoutes } from './routes/task.routes.js';

export function buildServer(repository: TaskRepository = new PostgresTaskRepository()) {
  const app = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        coerceTypes: false,
      },
    },
  });

  const createTask = new CreateTask(repository);
  const getTask = new GetTask(repository);
  const taskController = new TaskController(createTask, getTask);

  void app.register(healthRoutes);

  void app.register(taskRoutes, {
    controller: taskController,
  });

  return app;
}
