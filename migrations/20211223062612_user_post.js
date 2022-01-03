
exports.up = function (knex) {
  return knex.schema.createTable('user_post', (table) => {
    table.increments("id").primary();
    table.integer('profile_id').references('user_profile');
    table.string('written_text');
    table.integer('media_location');
    table.string('photoURL');
    table.string('videoURL');
    table.timestamps(false, true);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_post');
};
