# Session Integration Plan

1. Install express-session if not present.
2. Add express-session middleware to index.js.
3. On successful login, store username in session.
4. On /api/delay, require session and add username to DB.
5. Ensure delays table has a username column.
6. Restart backend after changes.
