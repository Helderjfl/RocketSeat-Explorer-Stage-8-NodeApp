// npx knex migrate:make createMovieNotes
export const up = (knex) => { 
  return knex.schema.createTable('movie_notes', table => {
    table.increments('id');
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.integer('rating').unsigned().notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });   
}

export const down = (knex) => knex.schema.dropTable('movie_notes');