import { IConnectionDB } from "../config/types";
import pg, { IDatabase } from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";


const connection: IConnectionDB = {
    "user": "postgres",
    "password": "111",
    "port": 5432,
    "host": "localhost",
    "database": "menager"
}

export const db: IDatabase<{}, IClient> = pg()(connection);

console.log({ ...connection });



