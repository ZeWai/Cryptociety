
exports.up = function(knex) {
  return knex.schema.createTable('videos', (table) => {
      table.increments();
      table.string('video_name');
      table.string('video_url');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos');
};
