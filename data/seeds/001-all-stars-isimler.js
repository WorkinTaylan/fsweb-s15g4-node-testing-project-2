/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('AllStars').truncate()
  await knex('AllStars').insert([
    {Player_Name: 'Kobe', Forma_No:24},
    {Player_Name: 'Iverson',Forma_No:3},
    {Player_Name: 'Chris Bosh',Forma_No:0}
  ]);
};
