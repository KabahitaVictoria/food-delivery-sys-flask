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

## Functionality
- user info reflected on the dashboard
- user can update their info

## Current progress...
- adding functionality for adding categories and items to categories
- designing the profile ui for a user
- designing dashboard and profile for administrator
