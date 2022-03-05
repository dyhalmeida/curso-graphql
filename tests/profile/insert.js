const knex = require('../../config/db')

const profile = {
  name: 'any_name ' + Math.random(),
  role: 'any_role'
}

const main = async () => {

  try {
    await knex.insert(profile).into('profiles')
    console.log('Profile created')
  } catch (error) {
    console.error(error.sqlMessage)
  } finally {
    process.exit(0)
  }

}

main()
