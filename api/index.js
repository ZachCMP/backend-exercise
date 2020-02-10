const knex = require('knex')
const parse = require('csv-parse/lib/sync')
const path = require('path')
const fs = require('fs')


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
        await db.schema.dropTableIfExists('stations')

        await db.schema.createTable('stations', table => {
          table.increments('id')
          table.string('Fuel Type Code')
          table.string('Street Address')
          table.string('City')
          table.string('State')
          table.string('ZIP')
          table.float('Latitude', 6)
          table.float('Longitude', 6)
          table.string('Open Date')
          table.string('Country')
        })

        const csvFile = fs.readFileSync(path.join(__dirname, './data.csv')).toString() 

        const csvData = parse(csvFile, {
          columns: true,
          skip_empty_lines: true
        })

        for (const row of csvData) {
          await db('stations').insert(row)
        }

        return true
      } catch(err) {
        throw err.message
      }
    },
    getStationsForBbox: async ({ lat, lon }) => {
      try {
        const stations = await (
          db('stations')
          .select('*')
          .where('Latitude', '>', lat.min)
          .andWhere('Latitude', '<', lat.max)
          .andWhere('Longitude', '>', lon.min)
          .andWhere('Longitude', '<', lon.max)
        )
        return {
          "type": "FeatureCollection",
          "features": [
            ...stations.map(item => ({
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [item.Longitude, item.Latitude]
              },
              "properties": {
                "name": `${item['Fuel Type Code']} - ${item['Street Address']}`
              }
            }))
          ]
        }
      } catch(err) {
        throw err
      }
    }
  }
}