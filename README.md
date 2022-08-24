# Build a Storefront Backend
##mohamed helal

 Tech used to create the project

- Js
- Ts
- node.js
- Express
- Jasmine
- Postgres

 Project description

this app made to simulate store allow to create users with high security information , create products and can submit orders 


 How to run


 **Databases you need to create**
- CREATE DATABASE store_dev;
- CREATE DATABASE store_test;

**Grant all database privileges to user in both databases**
- npm run test:windows (it will create the tables and run tests on the store_test to test all routes and all CRUD functions on the database)

- On store_dev you need to run (npm run migration:run) after creating database to put tables and start working 




**Information You Need to start Working**
- server port (3000), database port (5432).
- npm install
- Create a new database. 
- create env file
- my env file content:
 
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Medo0121038229123
BCRYPT_PASSWORD=my-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token

    
- Create the tables by (db-migrate up).
- For tests run (npm run jasmine).
- Use create user endpoint to get a JWT token
- Insert some data in tables manually
- Use the endpoints which declared in Requirements.md file
