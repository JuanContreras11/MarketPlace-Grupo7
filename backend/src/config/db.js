import pg from 'pg';
import 'dotenv/config'
const { Pool } = pg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  allowExitOnIdle: true
};

const pool = new Pool(config);

const createTables = async () => {
  try {
    // Crear tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        date_of_birth DATE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        CONSTRAINT check_age_18_or_more CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years')
      );
    `);

    // Crear tabla de categorías
    await pool.query(`
      CREATE TABLE IF NOT EXISTS category (
        id SERIAL PRIMARY KEY,
        category VARCHAR(255)
      );
    `);

    // Crear tabla de productos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        category_id INTEGER,
        name VARCHAR(255),
        description VARCHAR(255),
        image VARCHAR(255),
        price INTEGER,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
      );
    `);

    // Crear tabla de favoritos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        products_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (products_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

createTables();

export default pool;
