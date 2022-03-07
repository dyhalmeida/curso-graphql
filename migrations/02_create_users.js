exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('age').notNullable()
    table.string('email').notNullable().unique()
    table.boolean('vip').notNullable().defaultTo(true)
    table.string('password', 60).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  }).then(() => {
    return knex('users').insert([
      { name: 'John', age: 30, email: 'john@email.com', password: '1234' },
      { name: 'Emilia', age: 32, email: 'emilia@email.com', password: '1234' }      
    ])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};