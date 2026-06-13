import mysql from 'mysql2/promise';
 
 export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
 });

try {
    const connection = await pool.getConnection();
    console.log(`Conexión a la base de datos ${process.env.DB_NAME} establecida correctamente.`);
    connection.release();
} catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
}

