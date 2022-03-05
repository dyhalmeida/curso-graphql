const knex = require('../../config/db')

const main = async () => {

  try {
    
    let profiles = await knex.select('*').from('profiles')
      .then(profiles => {
        return profiles.map(profile => ({ ...profile }))
      })
    console.log(profiles)

    profiles = await knex.select('*').from('profiles').limit(3).offset(2)
      .then(profiles => {
        return profiles.map(profile => ({ ...profile }))
      })
    console.log(profiles)

    profiles = await knex.select('*').from('profiles').where({ id: 2 }).first()
    .then(profile => {
      return { ...profile }
    })
    console.log(profiles)

  } catch (error) {
    console.error(error.sqlMessage)
  } finally {
    process.exit(0)
  }

}

main()
