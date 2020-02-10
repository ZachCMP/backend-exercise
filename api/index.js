const knex = require('knex')

module.exports = config => {
  const db = knex({
    client: 'pg',
    connection: {
      host : config.HOST,
      user : config.USER,
      password : config.PASSWORD,
      database : config.NAME,
      port: config.PORT,
    }
  })

  return {
    init: async (options = {}) => {
      try {
        await db.schema.dropTableIfExists('test')
        await db.schema.createTable('test', table => {
          table.increments('id')
          table.string('name')
        })
        await db('test').insert({ name: 'apples' })
      } catch(err) {
        throw err.message
      }
      return { ok: true }
    },
    test: async () => {
      return await db('test').select('name')
    }
  }
}