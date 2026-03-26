# Cat Management API

A RESTful API for managing cat/user data with full CRUD operations.

## Base URL
*Your live API URL will go here after deployment*

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/api/health` | Server health check |
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a single user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Testing with curl

### Create a user
```bash
curl -X POST https://your-api.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Fluffy","age":3,"type":"Indoor"}'