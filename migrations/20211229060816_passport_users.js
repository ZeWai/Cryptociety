
exports.up = function(knex) {
    return knex.schema.createTable("passport_users", (table) => {
        table.increments().primary();
        table.string("username");
        table.string("gmail_id");
        table.string("facebook_id");
        table.string("hash");
        table.string("access_token");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("passport_users");
};
