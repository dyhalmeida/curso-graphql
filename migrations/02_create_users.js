exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('age').notNullable()
    table.string('email').notNullable().unique()
    table.boolean('vip').notNullable().defaultTo(true)
    table.string('password', 60).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};