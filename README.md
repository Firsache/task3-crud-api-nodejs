# task3-crud-api-nodejs

the Assignment of building CRUD API with Node.js is here
https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

To install the project clone this repository and install packages (npm install)

There are such scripts to start your server:

$npm run start:dev

$npm run start:prod

You need to use port 4000 and the endpoint `api/users`:
**GET** `api/users` is used to get all persons
Server answers with status code 200 and all users records

**GET** `api/users/{userId}`
Server answers with status code 200 and record with id === userId if it exists
Server answer swith status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist

**POST** `api/users` is used to create record about new user and store it in database
Server answers with status code 201 and newly created record
Server answers with status code 400 and corresponding message if request body does not contain required fields

`id` — is generated on server side
`username` — user's name (string, required)
`age` — user's age (number, required)
`hobbies` — user's hobbies (array of strings or empty array, required)

**PUT** `api/users/{userId}` is used to update existing user
Server answers with status code 200 and updated record
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist

**DELETE** `api/users/{userId}` is used to delete existing user from database
Server answers with status code 204 if the record is found and deleted
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist

Requests to non-existing endpoints are handled with status code 404
