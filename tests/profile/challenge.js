const knex = require('../../config/db')

const saveUser = async (name, age, email, password) => {

  const [id] = await knex.insert({
    name,
    age,
    email,
    password
  }).into('users')

  if (!id) throw new Error('Could not create a new user')

  const user = await knex.select('*').from('users').where({ id }).first()
    .then(user => ({ ...user }))

  if (!user) throw new Error('User not found')

  return user
}

const saveProfile = async (name, role) => {

  const [id] = await knex.insert({
    name,
    role,
  }).into('profiles')

  if (!id) throw new Error('Could not create a new profile')

  const profile = await knex.select('*').from('profiles').where({ id }).first()
    .then(profile => ({ ...profile }))

  if (!profile) throw new Error('Profile not found')

  return profile

}


const addProfileToUser = async (user, ...profiles) => {

  for (const profile of profiles) {

    await knex.insert({
      user_id: user.id,
      profile_id: profile.id
    }).into('users_profiles')

  }

  const usersProfiles = await knex.select('*').from('users_profiles').then(usersProfiles => ({ ...usersProfiles }))
  console.log(usersProfiles)

}


const main = async () => {

  try {

    const user = await saveUser('Mayara', 25, 'mayrochinha@gmail.com', 'donatela0')
    console.log(user)

    const [profileA, profileB] = await Promise.all([saveProfile('rh', 'Departamento pessoal'), saveProfile('fin', 'Financeiro')])
    console.log(profileA)
    console.log(profileB)

    await addProfileToUser(user, profileA, profileB)
  
  } catch (error) {
    console.error(error.sqlMessage)
  } finally {
    process.exit(0)
  }

}

main()
