import { describe, expect, it } from 'vitest';
import { NotFoundError } from '../../src/application/errors/not-found.error.js';
import { DeleteTask } from '../../src/application/use-cases/delete-task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';

describe('DeleteTask', () => {
  it('should delete a task through the repository', async () => {
    let receivedId: number | null = null;

    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async () => {
        throw new Error('Not implemented');
      },
      update: async () => null,
      delete: async (id) => {
        receivedId = id;
        return true;
      },
    };

    const deleteTask = new DeleteTask(repository);

    await expect(deleteTask.execute({ id: 1 })).resolves.toBeUndefined();

    expect(receivedId).toBe(1);
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

    const deleteTask = new DeleteTask(repository);

    await expect(deleteTask.execute({ id: 999 })).rejects.toBeInstanceOf(NotFoundError);
  });
});
