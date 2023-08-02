In the project root directory, first you can run:

# Running the Backend
### `cd todo-api`
### `npm install`
### `npm install -g sequelize`
### `npm install -g sequelize-cli`

you need to have postgres server installed and running

check src/config/config.json, if the settings for development server are same to what you prefer

then in terminal,

### `sequelize db:create` this will create the db specified inside src/config/config.json
### `sequelize db:migrate` this will create the table by using the migration files
### `sequelize db:seed:all` this will create the demo entries inside the table for todos testing

### `npm start` to run the server on http://localhost:3000

To check if the server started running fine, you can go to http://localhost:3000/api - to see the data added by the seeder

# Running the Frontend

### `cd todo-app-frontend` in one terminal

### `npm install`

### `export PORT=3001 react-scripts start`

Port other than 3000 is required since our backend is on port 3000

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` to see the tests
