# SQLite Key-Value Store

A simple key-value storage using SQLite in pure JavaScript with sql.js. No native compilation needed. Works on Termux, Linux, Windows, macOS.

What This Is

This is a basic key-value database. You save data with a key and load it later. Values can be strings, numbers, objects, arrays. Everything is stored in a SQLite database file called data.db.

Files:
- src/app.js - Main program
- src/test.js - Tests
- src/db.js - Database connection
- src/log.js - Helper functions
- src/config.js - Settings

How to Use on Termux:

1. Install Node.js
pkg update && pkg upgrade
pkg install nodejs-lts

2. Clone or Download
git clone https://github.com/qoyixfec/sqlite-keyvalue-store.git
cd sqlite-keyvalue-store

3. Install Dependencies
npm install

4. Run the App
npm start
Expected output:
[INFO] Database ready
success

5. Run Tests
npm test
Expected output:
Test 1: success
Test 2: success
Test 3: success
Test 4: success
Test 5: success

6. Check Database
pkg install sqlite3
sqlite3 data.db "SELECT * FROM settings"

Common Commands:
npm install - Installs dependencies
npm start - Runs the app
npm test - Runs tests
rm data.db - Deletes database file

Troubleshooting:
- If you get "Cannot use import statement", make sure package.json has "type": "module"
- If you get "Cannot find module", run npm install again
- If app shows error, delete data.db and run again

@ Qnix
