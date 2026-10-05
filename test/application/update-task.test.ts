import { describe, expect, it } from 'vitest';
import { NotFoundError } from './../../src/application/errors/not-found.error.js';
import { UpdateTask } from './../../src/application/use-cases/update-task.js';
import type { Task } from '../../src/domain/entities/task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';

describe('UpdateTask', () => {
  it('should update a task through the repository', async () => {
    const updatedTask: Task = {
      id: 1,
      title: 'Learn Advanced TypeScript',
      description: 'Study application architecture',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let receivedId: number | null = null;
    let receivedChanges: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>> | null = null;

    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async () => updatedTask,
      update: async (id, changes) => {
        receivedId = id;
        receivedChanges = changes;

        return updatedTask;
      },
      delete: async () => false,
    };

    const input = {
      id: 1,
      title: 'Learn Advanced TypeScript',
      completed: true,
    };

    const updateTask = new UpdateTask(repository);

    const result = await updateTask.execute(input);

    expect(receivedId).toBe(input.id);
    expect(receivedChanges).toEqual({
      title: input.title,
      completed: input.completed,
    });
    expect(result).toEqual(updatedTask);
  });

  it('should throw NotFoundError when the task does not exist', async () => {
    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async () => {
        throw new Error('Not implemented');
      },
      update: async () => null,
      delete: async () => false,
    };

    const updateTask = new UpdateTask(repository);

    await expect(
      updateTask.execute({
        id: 999,
        title: 'Updated task',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should allow clearing the task description', async () => {
    const updatedTask: Task = {
      id: 1,
      title: 'Learn TypeScript',
      description: null,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let receivedChanges: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>> | null = null;

    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async () => updatedTask,
      update: async (_id, changes) => {
        receivedChanges = changes;

        return updatedTask;
      },
      delete: async () => false,
    };

    const updateTask = new UpdateTask(repository);

    const result = await updateTask.execute({
      id: 1,
      description: null,
    });

    expect(receivedChanges).toEqual({
      description: null,
    });
    expect(result.description).toBeNull();
  });
});
