# Career Vision Server

## Auth0 Setup

To use Auth0 authentication on the server, you need to set up the following environment variables in your `.env` file:

```env
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-api-identifier
```

### How to configure Auth0 for your API:

1. **Create an API in Auth0 Dashboard**:

   - Go to Applications → APIs
   - Click "Create API"
   - Set the identifier (this will be your `AUTH0_AUDIENCE`)
   - Choose RS256 signing algorithm
2. **Update your Auth0 Application**:

   - Go to Applications → Your App
   - Add your API to "Allowed APIs"
   - Grant the necessary scopes (e.g., `read:cv`, `write:cv`)
3. **Server Environment Variables**:

   ```env
   AUTH0_DOMAIN=dev-6jktmbydkkywgiti.us.auth0.com
   AUTH0_AUDIENCE=https://dev-6jktmbydkkywgiti.us.auth0.com/api/v2/
   ```

## API Endpoints

### Protected Routes (require Auth0 token):

- `POST /cv/generate` - Generate CV
- `POST /cv/save` - Save CV data
- `GET /cv/get` - Get CV data

### Public Routes:

- `POST /auth/register` - Register user (legacy)
- `POST /auth/login` - Login user (legacy)
- `GET /auth/get-token` - Get Auth0 management token

## Authentication Flow

1. **Client authenticates** with Auth0
2. **Client gets access token** from Auth0
3. **Client sends requests** with `Authorization: Bearer <token>` header
4. **Server validates token** using Auth0's JWKS endpoint
5. **Server extracts user info** from token and adds to `req.user`

## Features

- Auth0 JWT validation
- User info extraction from tokens
- Protected API endpoints
- CV generation and storage
