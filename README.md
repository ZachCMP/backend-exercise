To run the app app:

```bash
cp .env.example .env
# Modify .env to set app port and PostgreSQL config (.env.example has the defaults)
npm install
npm start
```

To init the DB:

`GET http://localhost:<port>/init` (Will run for a long time before returning true)

To use the app:

`http://localhost:<port>`

