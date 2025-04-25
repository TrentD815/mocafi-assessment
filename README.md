## MoCaFi Assessment | Card Balance Checker

## Usage and Test Users
Visit the live site here: https://mocafi-client.azurewebsites.net/

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
- PINs are obscured in the UI. For the sake of time, card numbers are assumed to be equivalent to a username and are not obscured. 
- Length of card numbers and PINs are not explicitly stated to prevent targeted brute force attacks
- PINs are stored hashed in the DB and verified on the backend
- Servers use https and TLS 1.3
### Out of Scope Considerations
- Ideally the card numbers and pins should be end-to-end encrypted. PINs (and potentially card numbers) should be masked across the network
- You could make some of the error messages more vague to prevent attackers from knowing exactly what they need to brute force.
Something like 'Invalid card number or PIN' instead of explicitly stating which one
- Services should be fully network restricted to known networks only such as a VNet or the whitelisted IPs of each service
### Stack 
- Frontend: React, Typescript, Vite
- Backend: Express, NodeJS, MongoDB
- Infra & Deployment: Azure, Docker, MongoDB Atlas
  - 2 separate Azure App Services are currently deployed

### Folder Structure
I organized the front and backend folder into a common structure which scales well as the codebase
grows, It's a bit overkill since there is only 1 file in a lot of the folders, but it's good for demonstration purposes

### Final Thoughts
Thank you for the challenge!
