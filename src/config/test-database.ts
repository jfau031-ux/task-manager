import { pool } from './database.js';

async function testDatabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');

    console.log('✅ PostgreSQL conectado');
    console.log('🕐 Hora del servidor:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error);
  } finally {
    await pool.end();
  }
}

testDatabaseConnection();
