import mysql from 'mysql2/promise';

const CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'blogdb'
}

async function establishConnection() {
    try {
        const connection = await mysql.createConnection(CONFIG);
        return connection;
    } catch (error) {
        throw error;
    }
}

export default establishConnection;