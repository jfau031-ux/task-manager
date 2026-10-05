import { describe, expect, it } from 'vitest';
import { GetTask } from '../../src/application/use-cases/get-task.js';
import type { Task } from '../../src/domain/entities/task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';

describe('GetTask', () => {
  it('should return a task when it exists', async () => {
    const task: Task = {
      id: 1,
      title: 'Learn TypeScript',
      description: 'Study application architecture',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

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

    const getTask = new GetTask(repository);

    const result = await getTask.execute({ id: 1 });

    expect(result).toEqual(task);
  });

  it('should throw NotFoundError when the task does not exist', async () => {
    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async (newTask) => ({
        id: 2,
        ...newTask,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      update: async () => null,
      delete: async () => false,
    };

    const getTask = new GetTask(repository);

    await expect(getTask.execute({ id: 999 })).rejects.toThrow('Task with id 999 not found');
  });
});
