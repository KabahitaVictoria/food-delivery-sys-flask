# FOOD-DELIVERY APP (Flask and React JS)
## Screenshot
![project-img](https://github.com/KabahitaVictoria/food-delivery-sys-flask/assets/89969629/be6f93b9-0a7a-49f6-97d1-a18fdec6c728)

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
- user can add orders which will be reflected in the orders page

## Current progress...
- implementing admin code from Shadia
