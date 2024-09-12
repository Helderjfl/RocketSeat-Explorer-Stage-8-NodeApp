// npx knex migrate:make createMovieTags
export const up = (knex) => { 
  return knex.schema.createTable('movie_tags', table => {
    table.increments('id');
    table.text('name').notNullable();
    table.integer('note_id').unsigned().references('id').inTable('movie_notes').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');
  });   
}

export const down = (knex) => knex.schema.dropTable('movie_tags');