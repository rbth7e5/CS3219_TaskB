# CS3219 Task B
A simple REST API that supports GET, POST, PUT and DELETE request for contacts management.
## Setup
1. Make sure you have `node` installed
2. Clone the repository and run `npm install`

## Supported endpoints
1. Get all contacts: GET request to `/api/contacts`
2. Create a new contact: POST request to `/api/contacts`
3. Get a single contact: GET request to `/api/contacts/{id}`
4. Put a single contact: PUT request to `/api/contacts/{id}`
5. Delete a contact: DELETE request to `/api/contacts/{id}`
6. API root: `/api`

POST Body:
1. Please ensure that the Post request body is encoded with `x-www-form-urlencoded`
2. Ensure you specify key value pairs for `name`, `phone`, `email`, `gender`

## Running locally
1. Get the MongoDB login username and password from me
2. Run `DBUSERNAME=<username> DBPASSWORD=<password> node local.js` from the project root

## Accessing deployed API
The deployed API is hosted with AWS Lambda and AWS API Gateway at the following url:
[https://3a3opn0d5c.execute-api.ap-southeast-1.amazonaws.com/prod/api](https://3a3opn0d5c.execute-api.ap-southeast-1.amazonaws.com/prod/api)

Just append the supported endpoints defined above to access the different requests on the deployed API.

## Running tests
1. To run tests locally, just run `DBUSERNAME=<username> DBPASSWORD=<password> npm run tests`, with the username and password provided.
2. Travis automatically runs tests once a branch is pushed into the [repo](https://travis-ci.org/github/rbth7e5/CS3219_TaskB).

## Setup Frontend
1. In the project root, `cd frontend`
2. Do `npm install`
3. Run the React App locally by doing `npm start`