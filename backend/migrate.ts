import {
    userMigrate,
    documentMigrate,
    chunkMigrate,
    conversationMigrate,
    messageMigrate
} from './src/migrations';
import { pool } from './src/config/db'



async function runMigration() {
    try {
        await userMigrate(pool);
        await documentMigrate(pool);
        await chunkMigrate(pool);
        await conversationMigrate(pool);
        await messageMigrate(pool);

    } catch (error) {
        console.log("Migration failed:",error)
    } finally {
        await pool.end()
    }
}

runMigration()