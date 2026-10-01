import type { Task } from '../../../domain/entities/task.js';
import type { TaskRepository } from '../../../domain/repositories/task.repository.js';
import { pool } from '../../../config/database.js';

type TaskRow = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
};

type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

type UpdateTaskData = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;

export class PostgresTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    const result = await pool.query<TaskRow>(
      `
        SELECT
          id,
          title,
          description,
          completed,
          created_at,
          updated_at
        FROM tasks
        ORDER BY id ASC
      `,
    );

    return result.rows.map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<Task | null> {
    const result = await pool.query<TaskRow>(
      `
        SELECT
          id,
          title,
          description,
          completed,
          created_at,
          updated_at
        FROM tasks
        WHERE id = $1
      `,
      [id],
    );

    const row = result.rows[0];

    return row ? this.toDomain(row) : null;
  }

  async create(task: CreateTaskData): Promise<Task> {
    const result = await pool.query<TaskRow>(
      `
        INSERT INTO tasks (
          title,
          description,
          completed
        )
        VALUES ($1, $2, $3)
        RETURNING
          id,
          title,
          description,
          completed,
          created_at,
          updated_at
      `,
      [task.title, task.description, task.completed],
    );

    const row = result.rows[0];

    if (!row) {
      throw new Error('Failed to create task');
    }

    return this.toDomain(row);
  }

  async update(id: number, task: UpdateTaskData): Promise<Task | null> {
    const result = await pool.query<TaskRow>(
      `
        UPDATE tasks
        SET
          title = COALESCE($1, title),
          description = COALESCE($2, description),
          completed = COALESCE($3, completed),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING
          id,
          title,
          description,
          completed,
          created_at,
          updated_at
      `,
      [task.title ?? null, task.description ?? null, task.completed ?? null, id],
    );

    const row = result.rows[0];

    return row ? this.toDomain(row) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `
        DELETE FROM tasks
        WHERE id = $1
      `,
      [id],
    );

    return result.rowCount === 1;
  }

  private toDomain(row: TaskRow): Task {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
