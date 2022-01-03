exports.up = function (knex) {
  return knex.schema.createTable('friendships', function (table) {
    table.integer('request_id').references('user_profile.id');
    table.integer('user_profile_id');
    table.string('relation');
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('friendships');
};
