const knex = require('../../config/db')

const main = async () => {

  try {

    let profile = await knex.select('*').from('profiles').where({ id: 1 }).first()
      .then(profile => ({ ...profile }))
    console.log(profile)

    await knex('profiles')
    .update({
      name: 'user',
      role: 'User'
    })
    .where({ id: profile.id })

    profile = await knex.select('*').from('profiles').where({ id: profile.id }).first()
    .then(profile => ({ ...profile }))
    console.log(profile)

  } catch (error) {
    console.error(error.sqlMessage)
  } finally {
    process.exit(0)
  }

}

main()
