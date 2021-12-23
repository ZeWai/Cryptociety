
exports.up = function(knex) {
  return knex.schema.createTable('friendships', function(table) {
      table.integer('request_friend').references('user_profile.id');
      table.integer('accept_friend').references('user_profile.id');
      table.timestamps(false,true);
      table.string('type');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('friendships');
};
