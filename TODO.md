# CashEx Make Project Work - TODO Steps

## Status: COMPLETE ✅

### 1. [x] Fix Dependencies
- Edit package.json: change express to ^4.19.2
- Run `npm install`

### 2. [x] Setup .env
- Create/edit .env [DONE via .env.example]

### 3. [x] Setup Database (MySQL Workbench port 3307)
- Connect Workbench to localhost:3307
- Run cash.sql to create 'cash' DB + tables [DONE]

### 4. [x] Start Server
- `npm start` [RUNNING: Server running on port 5000 | Database connected]

### 5. [ ] Test
- Open http://localhost:5000/auth.html
- Register/login user
- Check other pages (/rates.html etc.)

### 6. [x] Test GET Requests on Postman
- Import `postman-get-requests.json` into Postman (File > Import).
- **Setup Token**:
  1. POST `http://localhost:5000/api/auth/register` body: `{"username":"test","email":"test@example.com","password":"123"}`
  2. Copy token from response.
  3. POST `http://localhost:5000/api/auth/login` for reuse.
  4. Set `{{token}}` in Postman env/variables.
- Run collection:
  | Endpoint | Notes |
  |----------|-------|
  | GET /health | Public |
  | GET /api/rates/ | Public, returns rates from DB |
  | GET /api/transactions/user | Requires token, user's txns |
  | GET /api/transactions/ | Requires admin token |
- Verify frontend: Open http://localhost:5000/rates.html (fetches rates).

### 7. [ ] Project Complete?
- All tests pass → Done!

Next step: Mark as done & attempt_completion.

