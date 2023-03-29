# FOOD-DELIVERY APP (Flask and React JS)
## starting both frontend and backend in different terminals
Backend:
- flask --app run.py --debug run

Frontend:
- cd frontend
- npm run dev

## Authentication
I have added authentication using jwt access tokens stored in the local storage
- A user can sign up and sign in 
- Authenticated users can see their first name shown on the dashboard
- wrong sign in details bring up error messages
- unauthenticated users are not redirected to the dashboard
- users can logout of their account
- refresh tokens have been set up so that a user isn't asked to login again after access token expires (after one hour)

## Current progress
- reflecting user info on the dashboard
- add functionality for adding categories and items to categories
- design the profile ui for a user
- design dashboard and profile for administrator
