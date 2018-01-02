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

    public static async query(query: string, parameters: any[] = []): Promise<any> {
        let connection = await Database.getConnection();
        let formattedQuery = connection.format(query, parameters);

        return new Promise<any>((resolve, reject) => {
            connection.query(formattedQuery, ((error: MysqlError, result: any) => {
                connection.release();
                if (error) reject(error);
                else resolve(result);
            }));
        });
    }
}
