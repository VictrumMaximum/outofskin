import { resolve } from 'path';
import { config } from 'dotenv';
import * as fs from 'fs';

const path = resolve(__dirname, '../.env');
if (!fs.existsSync(path)) {
    throw new Error(`No environment file found.
    Please create .env in ${path}
    with the following keys:
    PORT=
    NODE_ENV=development/production`);
}
config({path});
