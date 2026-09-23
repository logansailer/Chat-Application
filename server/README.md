## How to Run

### Requirements:
MySQL
npm
node.js
Postman

### 1. Create the database
In MySQL, create a database (the default name in knex is `giftogram`):
```sql
CREATE DATABASE giftogram;
```
then run database.sql in MySQL to setup the db

### 2. Environment
Fill in the included .env in server/
```
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_DATABASE_PASSWORD_HERE
DB_NAME=giftogram

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=YOUR_JWT_SEKRET_KEY_HERE
JWT_EXPIRE=48h
```

### 3. Install and start server
from the root, cd into server
run
```
npm install
npm start
```

### 4. Authentication
on the login post request, the server responds with an authentication token needed to send messages as a user. Save the token
on the send_message post request, the token is required. In the authentication tab of Postman, select type as "bearer token", then paste the saved token.
The token must match the user sending the message to send a message successfuly