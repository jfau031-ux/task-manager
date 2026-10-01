import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { pool } from '../config/database.js';

async function migrate() {
  try {
    const migrationPath = path.join(
      process.cwd(),
      'src',
      'db',
      'migrations',
      '001_create_tasks.sql',
    );

    const sql = await readFile(migrationPath, 'utf-8');

    await pool.query(sql);

    console.log('✅ Migration executed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();
