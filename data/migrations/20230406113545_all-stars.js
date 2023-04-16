/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("AllStars", AllStars=>{
            AllStars.increments("AllStars_id")
            AllStars.string("Player_Name").notNullable().unique()
            AllStars.integer("Forma_No").unique().notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("AllStars")
};
