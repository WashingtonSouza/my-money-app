# My Money App

This repository contains the source code of a simple ReactJs front-end application with an NodeJs back-end server. Also, the application data is stored in a MongoDB database.

The application consists in managing income as well as spents, and calculating the balance.

## Prerequisites

Please, follow the prerequisites before running the application.

* Install NodeJs and NPM. ([nodejs.org](https://nodejs.org/en/))
* Install MongoDB. ([mongodb.com](https://www.mongodb.com/))

## Running the application

In order to have the application fully working, you need to run both the back-end and the front-end.

### Running the back-end

* From the root directory, go to the backend directory using `cd backend`.
* Install the dependencies using `npm install`.
* Run the server `npm run dev`.

After following the steps above, the back-end server will be running. You can check that by accessing [http://localhost:3003/](http://localhost:3003/)


### Running the front-end

* From the root directory, go to the frontend directory using `cd frontend`.
* Install the dependencies using `npm install`.
* Run the application `npm run dev`.

After that, you can access [http://localhost:8080/](http://localhost:8080/) and check your application running.

## Troubleshooting

If you end up having a message like the one below when trying to run the back-end server, please make sure you have MongoDB service running on your machine:

```
MongoError: failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017]
```
## Auth
To run the project is necessary to create the .env file inside the `backend/src` 

#### File content Example:
```
module.exports = {
  authSecret: 'YOUR SECRET STRING'
}
```
####Don't forget to add this file on gitignore

