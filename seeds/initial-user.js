exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_profile")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user_profile").insert([
        {
          email_address: "ivanchengzhongyan@gmail.com",
          password: "123456",
          country: "HongKong",
          date_of_birth: "1746-01-01",
          username: "Wintersight",
          gender: "male",
          profile_picture: "1",
        },
        {
          email_address: "rex101@gmail.com",
          password: "rrr53dggg",
          country: "HongKong",
          date_of_birth: "1821-07-01",
          username: "Sunsight",
          gender: "male",
          profile_picture: "2",
        },
        {
          email_address: "Shadetree@gmail.com",
          password: "whysnoopmepassword",
          country: "HongKong",
          date_of_birth: "2010-01-01",
          username: "Godsight",
          gender: "male",
          profile_picture: "3",
        },
      ]);
    });
};
