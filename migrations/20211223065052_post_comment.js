
exports.up = function(knex) {
  return knex.schema.createTable('post_comment', (table) => {
      table.increments('id');
      table.integer('post_id').references('user_post.id');
      table.integer('profile_id').references('post_like.id');
      table.string('comment_text');
      table.timestamps(false,true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('post_comment');
};
