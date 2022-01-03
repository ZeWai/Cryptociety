require("dotenv").config();

const userQueries = require("../database/userQueries");
const development = require("../knexfile").development;
const knex = require("knex")(development);
const TABLE_NAME = "user_profile";