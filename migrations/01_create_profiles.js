exports.up = function(knex) {
  return knex.schema.createTable('profiles', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('role').notNullable()
  }).then(() => {
    return knex('profiles').insert([
      { name: 'comum', role: 'Comum' },
      { name: 'admin', role: 'Administrador' },
      { name: 'master', role: 'Master' }
    ])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles')
};