import { createPool }  from "mysql2/promise";

export const pool = createPool({
    host: "db",
    user: "root",
    password: "123456",
    database: "apiNode",
    port: 3306
  });