import { development as config } from "../../../knexfile.js";
import knex from "knex";

const connection = knex(config);

export default connection;