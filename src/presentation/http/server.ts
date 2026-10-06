import Fastify from 'fastify';
import { CreateTask } from '../../application/use-cases/create-task.js';
import { PostgresTaskRepository } from '../../infrastructure/database/repositories/postgres-task.repository.js';
import { TaskController } from './controllers/task.controller.js';
import { healthRoutes } from './routes/health.routes.js';
import { taskRoutes } from './routes/task.routes.js';

export function buildServer() {
  const app = Fastify({
    logger: true,
  });

  const taskRepository = new PostgresTaskRepository();
  const createTask = new CreateTask(taskRepository);
  const taskController = new TaskController(createTask);

  void app.register(healthRoutes);

  void app.register(taskRoutes, {
    controller: taskController,
  });

  return app;
}
