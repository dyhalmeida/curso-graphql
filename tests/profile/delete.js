const knex = require('../../config/db')

const main = async () => {

  try {

    let profiles = await knex.select('*').from('profiles').whereIn('id', [8, 9, 10, 11])
      .then(profiles => profiles.map(profile => ({ ...profile })))
    console.log(profiles)

    /** Delete */
    await knex.delete().from('profiles').whereIn('id', profiles.map(profile => profile.id))

    profiles = await knex.select('*').from('profiles').whereIn('id', [8, 9, 10, 11])
      .then(profiles => profiles.map(profile => ({ ...profile })))
    console.log(profiles)
  
  } catch (error) {
    console.error(error.sqlMessage)
  } finally {
    process.exit(0)
  }

}

main()
