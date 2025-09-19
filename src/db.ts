import knex from "knex";

export const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '1511',
        database: 'produtos'
    }
})