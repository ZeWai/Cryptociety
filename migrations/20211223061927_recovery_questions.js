
exports.up = function(knex) {
  return knex.schema.createTable('recovery_questions', (table) => {
      table.increments('id');
      table.integer('profile_id').references('user_profile.id');
      table.string('secQ1', 255);
      table.string('secQ2', 255);
      table.string('secQ3', 255);
      table.string('ansQ1', 255);
      table.string('ansQ2', 255);
      table.string('ansQ3', 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recovery_questions');
};
