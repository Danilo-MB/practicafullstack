import keys from './keys';
import mysql from 'mysql';

const pool : mysql.Pool = mysql.createPool(keys.database)

pool.getConnection((err, conn) => {
    if (err) {
        console.log("Error creating connection: " + err);
    } else {
        pool.releaseConnection(conn);
        console.log("DB is connected");
    }
});

export default pool;