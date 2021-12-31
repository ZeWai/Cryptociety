exports.up = function (knex) {
  return knex.schema.createTable("user_profile", function (table) {
    table.increments("id").primary();
    table.string("email_address", 255).unique;
    table.string("password", 255);
    table.string("country", 255);
    table.date("date_of_birth");
    table.string("username", 255);
    table.string("gender");
    table.string("admin");
    table.string("solgan");
    table.string("profile_picture");
    table.string("group");
    table.string("hash");
    table.string("access_token");
    table.string("facebook_id").unique;
    table.string("gmail_id").unique;
    table.timestamps(false, true);

  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_profile");
};
