import { createPool, Pool, PoolConnection, MysqlError } from 'mysql';
import { Environment } from '../utils/environment';

export class Database {

    protected static pool: Pool;

    protected static async getConnection(): Promise<PoolConnection> {
        if (Database.pool === undefined) {
            Database.pool = createPool({
                connectionLimit: 100,
                database: Environment.bddName,
                debug: false,
                host: Environment.bddHost,
                password: Environment.bddPassword,
                port: Environment.bddPort,
                user: Environment.bddUser
            });
        }

        return new Promise<PoolConnection>((resolve, reject) => {
            Database.pool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (connection) resolve(connection);
                else reject(error);
            });
        });
    }

    public static async query(request: string): Promise<any> {
        let connection = await Database.getConnection();

        return new Promise<any>((resolve, reject) => {
            connection.query(request, ((error: MysqlError, result: any) => {
                connection.release();
                if (error) reject(error);
                else resolve(result);
            }));
        });
    }
}
