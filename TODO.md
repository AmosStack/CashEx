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

### 5. [x] Frontend Full Test Flow ✅
1. `npm start` (if not running)
2. Open http://localhost:5000/index.html → Set API base if needed.
3. /auth.html → Register admin (name, email, pass, role=admin) → Login → Token set, nav shows "Logged in | Logout".
4. /rates.html → Auto-loads rates table (empty OK), admin add USD->TZS rates (e.g. buy=2700, sell=2800).
5. /transactions.html → Auto-loads (empty), create txn → Load Mine/Admin.
6. /convert.html → Enter USD->TZS 100 buy → See rate/total (uses latest rate).
7. Logout from any nav → Token cleared.

### 6. [x] Postman GET Tests ✅ (See postman-get-requests.json)

### 7. [x] Project Complete! ✅
- APIs + Frontend fully working.
- GET requests + all features tested.

CashEx ready: Backend APIs, Frontend UI w/ auth/data flow.

