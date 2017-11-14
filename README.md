# RESTful API design
### use Node.js, Express, Mongoose


**The Basic Goal** : Create an API for a task management / todo list.


 Implement an API with the following end-points 


| Endpoints| Actions | Intended Outcome                                    |
|----------|---------|-----------------------------------------------------|
| users    | GET     | Respond with a List of users                        |
|          | POST    | Create a new user. Respond with details of new user |
|          | OPTIONS | See the query parameters below                      |
| users/:id| GET     | Respond with details of specified user or 404 error |
|          | PUT     | Replace entire user with supplied user or 404 error |
|          | DELETE  | Delete specified user or 404 error                  |
| tasks    | GET     | Respond with a List of tasks                        |
|          | POST    | Create a new task. Respond with details of new task |
|          | OPTIONS | See the query parameters below                      |
| tasks/:id| GET    | Respond with details of specified task or 404 error  |
|          | PUT     | Replace entire task with supplied task or 404 error |
|          | DELETE  | Delete specified user or 404 error                  |

In addition, the API has the following JSON encoded query string parameters for the GET requests to the `users` and `tasks` endpoints:

| Parameter | Description                                                                                  |
|----------|----------------------------------------------------------------------------------------------|
| where    | filter results based on JSON query                                                           |
| sort     | specify the order in which to sort each specified field  (1- ascending; -1 - descending)     |
| select   | specify the set of fields to include or exclude in each document  (1 - include; 0 - exclude) |
| skip     | specify the number of results to skip in the result set; useful for pagination               |
| limit    | specify the number of results to return (default should be 100 for tasks and unlimited for users)                    |
| count    | if set to true, return the count of documents that match the query (instead of the documents themselves)                    |

Here are some example queries and what they would return:

| Query                                                                                | Description                                             |
|-----------------------------------------------------------------------------------------|---------------------------------------------------------|
| `http://www.uiucwp.com:4000/api/users?where={"_id": "55099652e5993a350458b7b7"}`         | Returns a list with a single user with the specified ID |
| `http://www.uiucwp.com:4000/api/tasks?where={"completed": true}`                          | Returns a list of completed tasks                       |
| `http://www.uiucwp.com:4000/api/tasks?where={"_id": {"$in": ["235263523","3872138723"]}}` | Returns a set of tasks                                  |
| `http://www.uiucwp.com:4000/api/users?sort={"name": 1}`                                  | Returns a list of users sorted by name                  |
| `http://www.uiucwp.com:4000/api/users?select={"_id": 0}`                                  | Returns a list of users without the _id field           |
| `http://www.uiucwp.com:4000/api/users?skip=60&limit=20`                                   | Returns user number 61 to 80                            |

**The is should be able to handle any combination of those parameters in a single request**. For example, the following is a valid GET request:

```javascript
http://www.uiucwp.com:4000/api/users?sort={"name": 1}&skip=60&limit=20
```

## Environment Setup Guide
1. Clone the repository:
`git clone https://github.com/ittlepearl/Restful-API`, then `Restful-API`
2. Install dependencies:
`npm install`
3. Run the dev server:
`npm start` or
`nodemon --exec node server.js` to automatically restart the server on save.

