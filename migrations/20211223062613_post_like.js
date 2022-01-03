
exports.up = function(knex) {
  return knex.schema.createTable('post_like', (table) => {
      table.increments();
      table.integer('post_id').references('user_post.id');
      table.integer('profile_id').references('user_profile.id');
      table.timestamps(false,true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('post_like');
};
