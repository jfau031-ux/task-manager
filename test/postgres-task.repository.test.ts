import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { pool } from '../src/config/database.js';
import { PostgresTaskRepository } from '../src/infrastructure/database/repositories/postgres-task.repository.js';

describe('PostgresTaskRepository', () => {
  const repository = new PostgresTaskRepository();

  beforeEach(async () => {
    await pool.query('DELETE FROM tasks');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM tasks');
    await pool.end();
  });

  it('should create a task', async () => {
    const task = await repository.create({
      title: 'Learn TypeScript',
      description: null,
      completed: false,
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Learn TypeScript');
    expect(task.description).toBeNull();
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
  });

  it('should persist the created task in the database', async () => {
    const task = await repository.create({
      title: 'Persisted task',
      description: 'Test persistence',
      completed: false,
    });

    const persistedTask = await repository.findById(task.id!);

    expect(persistedTask).not.toBeNull();
    expect(persistedTask?.id).toBe(task.id);
    expect(persistedTask?.title).toBe('Persisted task');
    expect(persistedTask?.description).toBe('Test persistence');
    expect(persistedTask?.completed).toBe(false);
  });

  it('should return all tasks', async () => {
    await repository.create({
      title: 'Task 1',
      description: null,
      completed: false,
    });

    await repository.create({
      title: 'Task 2',
      description: 'Second task',
      completed: true,
    });

    const tasks = await repository.findAll();

    expect(tasks).toHaveLength(2);

    expect(tasks[0].title).toBe('Task 1');
    expect(tasks[0].completed).toBe(false);

    expect(tasks[1].title).toBe('Task 2');
    expect(tasks[1].description).toBe('Second task');
    expect(tasks[1].completed).toBe(true);
  });

  it('should find a task by id', async () => {
    const createdTask = await repository.create({
      title: 'Find me',
      description: 'Task to find',
      completed: false,
    });

    const task = await repository.findById(createdTask.id!);

    expect(task).not.toBeNull();
    expect(task?.id).toBe(createdTask.id);
    expect(task?.title).toBe('Find me');
    expect(task?.description).toBe('Task to find');
    expect(task?.completed).toBe(false);
  });

  it('should return null when task does not exist', async () => {
    const task = await repository.findById(999999);

    expect(task).toBeNull();
  });

  it('should update a task', async () => {
    const createdTask = await repository.create({
      title: 'Original title',
      description: 'Original description',
      completed: false,
    });

    const updatedTask = await repository.update(createdTask.id!, {
      title: 'Updated title',
      description: 'Updated description',
      completed: true,
    });

    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.id).toBe(createdTask.id);
    expect(updatedTask?.title).toBe('Updated title');
    expect(updatedTask?.description).toBe('Updated description');
    expect(updatedTask?.completed).toBe(true);
  });

  it('should allow clearing the task description', async () => {
    const createdTask = await repository.create({
      title: 'Task with description',
      description: 'Description to clear',
      completed: false,
    });

    const updatedTask = await repository.update(createdTask.id!, {
      description: null,
    });

    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.id).toBe(createdTask.id);
    expect(updatedTask?.title).toBe('Task with description');
    expect(updatedTask?.description).toBeNull();
    expect(updatedTask?.completed).toBe(false);
  });

  it('should return null when updating a task that does not exist', async () => {
    const updatedTask = await repository.update(999999, {
      title: 'Updated title',
    });

    expect(updatedTask).toBeNull();
  });

  it('should delete a task', async () => {
    const createdTask = await repository.create({
      title: 'Task to delete',
      description: null,
      completed: false,
    });

    const deleted = await repository.delete(createdTask.id!);

    expect(deleted).toBe(true);

    const task = await repository.findById(createdTask.id!);

    expect(task).toBeNull();
  });

  it('should return false when deleting a task that does not exist', async () => {
    const deleted = await repository.delete(999999);

    expect(deleted).toBe(false);
  });
});
