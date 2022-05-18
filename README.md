# ZeroBalance Server
Interview submission for ZeroBalance Technologies towards Backend Developer role.

## Documentation
The following link connects to the public postman documentation for this application  
[Postman Documentation](https://www.postman.com/spacehawx/workspace/zerobalance)

## TechStack
- NodeJS (v18)
- ExpressJS
- Typescript
- Mongoose (for mongodb)
- Morgan (for logging)
- Cors (for cors)
- Helmet (for CSRF)
- DotEnv (for .env loading)


## Assumptions
The following assumptions were made towards the completion of the assignment. In case of ambiguities, the best in knowledge option was considerd forward.

- User attemps are recorded across sessions, hence are stored in the user model itself instead of each session.
- Users validate themselves using Email + Password, and receive a JWT token (might have used PASETO, but JWT felt easier).
- For the sake of ease and implementation, *Passwords are not hashed and stored in the collections as is.*. In production, all passwords and other private information should be secured, either through restricted access or through cryptographic measures.
- The movie search only looks into relevant names, to extend the search, a better indexing strategy could be used or a newer search technology like elastic search could be used.


## Why Typescript ?
This allows ahead of time bug tracking while compilation and static typing which enables minimize bugs before anything is pushed or tested. It also allows to expose types so that resources are consistent and always follow the rules enforced by the respoctive types.

I also love using Typescript for it's intellisense through types. It allows for faster development and much better and understandable codebase.

## Project Structure
Explain Project structure here

## Requirements: 
- [x] The user signs up and sets up a password.
- [x] The user can logs in using email and password. Maximum password attempts are 4 after which the account gets locked for 30 minutes. 
- [x] The user provides basic information about themselves such as name, age, list of favourite movies and rating out of 5 for each movie. 
- [x] The user can search for a movie to fetch the average rating. 
- [x] Average rating is the average of the ratings provided by users for a particular movie 
- [x] The user might not enter the exact movie name, the search results should show all relevant movies. 
- [x] The user can edit the rating for particular movies and the history of changes is required to be maintained.

## Resources and References
Following sources were referred to while working on this assignment.

- JWT documentation for Correct Algorithm 