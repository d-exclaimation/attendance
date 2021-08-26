# Architecture overview

## Server

The server will be primarily be a GraphQL Server, this allow for a more defined control flow and flexible API for future changes, while mainting performance and efficiency on request.

The server is built in `Node` and `Typescript` as both will suffice for the task being done while not being over-engineered and takes too long to be developed.

Handling the GraphQL Request will be `Apollo Server` (v3), and `GraphQL Nexus` will be the code-first schema modelling tool.

The database of choice will be `Postgres` using along with `Prisma ORM` as it's easiest for me to use and provide all I need.

The idea is that the Server will specify a specific schema and allowed operation and the Client can take advantage of GraphQL to speed up the process of development.

| Name             | Usage                          | Reason                                                                     |
| ---------------- | ------------------------------ | -------------------------------------------------------------------------- |
| Node.js          | Server-side javascript runtime | Easy and scales well enough for the usage                                  |
| Typescript       | Language                       | A robust type system to make development easier, faster, and more reliable |
| Apollo Server v3 | GraphQL Middleware             | Allow to response to GraphQL request and follow all the required standards |
| GraphQL Nexus    | Schema and resolvers modelling | Allow for code-first type-safe schema and resolvers                        |
| Prisma           | Database Client                | Allow to communicate to a database efficiently and easily                  |
| Postgres         | SQL Database                   | Storing for structured information                                         |

## Client

The specification of the client has yet to be finalised. However, it will be a single page application to handle authentication and features with convenience

| Name  | Usage                           | Reason                                                           |
| ----- | ------------------------------- | ---------------------------------------------------------------- |
| React | Single Page Application Library | Allow for builing Single page, interactive UI/UX with Javascript |

## Server & Client response cycle

### Scenario 1: Authentication Server-side

#### `Login` / `Sign up`

A user will try to either log-in or sign-up through the React app. The React app will then make the appropriate GraphQL mutation to the server.

The server will handle fetching and confirming data inputs.

**If Successful**

The server will response the a `UserCredential` payload containing the user information and a the access token with its corresponding expiration date.

```graphql
"Wrapper for user with jwt"
type UserCredentials {
  expireAt: String!
  token: String!
  user: User!
}
```

```json
{
  "data": {
    "user": {
      "id": "<uid>",
      "name": "<name>"
    },
    "token": "<access-token>",
    "expireAt": "<expiration-date>"
  }
}
```

Along side the server will send a `set-cookie` header to change the client cookie jar to include the refresh-token which is used to refetch and avoid XSS and CSRF.

**If Failure**

The server will respond with an appropriate expected failure result or throw an error.
At this point, the client can either retry automatically or notify user before retrying.

---

#### `Refresh`

The access token is not persisted by the user at any type of storage to prevent any chance of XSS nor CSRF. Instead, the client will have a refresh token in their cookie jar to refetch the access token. This will prevent XSS as nothing is stored in a common place like localStorage and prevent CSRF as you can also perform refresh but can't read the resulting access token.

The process will be perform without too much hassle on the client side. If the expiration date was reach or that the app access token is empty, The client behind the scene (No user knowledge) will perform a GraphQL refresh mutation.

The server will read the refresh token from the cookie header and validate it.

**If Successful**

The server will respond similarly to the `Login/Signup` process with the correct user credentials

**If Failure**

The server will throw an error and no token is sent

---

![Scenario 1 (A & B)](./images/scenario-1.jpeg)

_<sub>Process diagram for login, sign up, and refreshing access token</sub>_

---

### Scenario 2: Authentication handling on the client-side

```typescript
// TODO: Finish overview
```
