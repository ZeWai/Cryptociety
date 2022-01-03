class UserPosts {
    constructor(knex) {
        this.knex = knex;
    }


    async add(note, user) {
        let query = await this.knex 
            .select("id")
            .from("user_profile")
            .where("username", user);

        console.log(query);

        if(query.length === 1) {
            await this.knex
                .insert({
                    written_text: note,
                    profile_id: query[0].id,
                })
                .into("user_post");
        } else {
            throw new Error(`Cannot submit this post as the user doesn't exist`);
        }
    }

    list(user) {
        if(typeof user !== "undefined") {
            let query = this.knex
                .select("user_post.id", "user_post.written_text")
                .from("user_post")
                .innerJoin("user_profile", "user_post.profile_id", "user_profile.id")
                .where("user_profile.username", user)
                .orderBy("user_post.written_text", "desc");

            return query.then((rows) => {
                console.log(rows);
                return rows.map((row) => ({
                    id: row.id,
                    written_text: row.content,
                }));
            });
        } else {
            let query = this.knex 
                .select("user_profile.username", "user_post.id", "written_text")
                .from("user_post")
                .innerJoin("user_profile", "user_post.profile_id", "user_profile.id");

            return query.then((rows) => {
                console.log(rows);
                const result = {};
                rows.forEach((row) => {
                    if(typeof result[row.username] === "undefined") {
                        result[row.username] = [];
                    }
                    result[row.username].push({
                        id: row.id,
                        written_text: row.content,
                    });
                });
                return result;
            });
        }
    }

    update(id, note, user) {
        let query = this.knex
            .select("id")
            .from("user_profile")
            .where("user_profile.username", user);

        return query.then((rows) => {
            if(rows.length === 1) {
                return this.knex("user_post").where("id", id).update({
                    written_text: note,
                });
            } else {
                throw new Error(`Cannot update the post if the user doesn't exist`);
            }
        });
    }

    remove(id, user) {
        let query = this.knex  
            .select("id")
            .from("user_profile")
            .where("user_profile.username", user);

        return query.then((rows) => {
            if(rows.length === 1) {
                return this.knex("user_post").where("id", id).del();
            } else {
                throw new Error(`Cannot remove a note if the user doesn't exist`);
            }
        });
    }
}


module.exports = UserPosts;