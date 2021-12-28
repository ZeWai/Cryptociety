exports.up = function (knex) {
  return knex.schema.createTable("user_profile", function (table) {
    table.increments('id').primary();
    table.string("email_address", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("country", 255);
    table.date("date_of_birth");
    table.string("username", 255).notNullable();
    table.string("gender");
    table.integer("profile_picture");
    table.timestamps(false,true);
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_profile');
};