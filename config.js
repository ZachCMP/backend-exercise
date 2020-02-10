require('dotenv').config()

module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,
  PG_CONFIG: {
    NAME: process.env.PG_NAME || 'postgres',
    USER: process.env.PG_USER || 'postgres',
    PASSWORD: process.env.PG_PASSWORD || '',
    HOST: process.env.PG_HOST || '127.0.0.1',
    PORT: process.env.PG_PORT || '5432',
  }
  
}