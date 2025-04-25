## MoCaFi Assessment | Card Balance Checker

## Usage and Test Users
Visit this link to see the live site: 

### Test Users/Cards
Use the below card numbers to test the site. 
1. **Card Number:** 5141000000009082 | **PIN:** 1234 | **Balance:** 112.38
2. **Card Number:** 5141000000009844 | **PIN:** 5678 | **Balance:** 62.78
3. **Card Number:** 5141000000009999 | **PIN:** 9999 | **Balance:**: N/A as card number is expired

## Features
- From UI:
  - Ability to enter a 16 digit card number
  - Optional feature to require a 4 digit PIN (optional because I wasn't fully sure if this was required or not)
  - Validation on whether you entered a proper card number (and PIN if required)
  - Ability to view the balance of your card assuming all checks pass
  - Clean UI error messages for various validation cases such as invalid card number
- From API
  - Validation on whether the card number passed is a proper 16 digit number
  - Validation on whether the card number is tied to an actual user in the DB
  - Validation on whether you entered a proper PIN if an account is found
  - Validation on whether the card is expired

### Security Focus
- PINs are obscured in the UI. For the sake of time card number are assumed to be equivalent to a username. 
- 
### Out of Scope Future Enhancements
- Ideally the card numbers and pins should be end-to-end encrypted
- You could make some of the error messages more vague to prevent attackers from knowing exactly what they need to brute force
### Stack 
- Frontend: React, Typescript, Vite
- Backend: Express, NodeJS, MongoDB
- Infra & Deployment: Azure, Github Actions, Docker, MongoDB Atlas

### Folder Structure
I organized the front and backend folder into a common structure which scales well as the codebase
grows, It's a bit overkill since there is only 1 file in a lot of the folders, but it's good for demonstration purposes

### Gallery
