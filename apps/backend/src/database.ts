// database.ts

import createConnectionPool, {sql} from '@databases/pg';
import tables from '@databases/pg-typed';
import DatabaseSchema from './__generated__';
import config from "./config";

export {sql};

const db = createConnectionPool(`postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`);
export default db;

// You can list whatever tables you actually have here:
const {users} = tables<DatabaseSchema>({
  databaseSchema: require('./__generated__/schema.json'),
});
export {users};