
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_post').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_post').insert([
        { profile_id: 1, written_text: "HELELELELELELLELELELEl" },
        { profile_id: 2, written_text: "this is my post for user 3" },
        { profile_id: 3, written_text: 'post number 3 LOL' }
      ]);
    });
};
