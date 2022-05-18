# Hybr1d Server
Interview submission for Hybr1d towards Backend Developer role.

## Documentation
The following link connects to the public postman documentation for this application  
[Postman Documentation](https://www.postman.com/spacehawx/workspace/hybr1d)

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

- For the sake of ease and implementation, *Passwords are not hashed and stored in the collections as is.*. In production, all passwords and other private information should be secured, either through restricted access or through cryptographic measures.
- The seller will not update the catalog post creation.
- The buyer will not update the order post creation.
- The routes for each role is restricted to that role.

## Why Typescript ?
This allows ahead of time bug tracking while compilation and static typing which enables minimize bugs before anything is pushed or tested. It also allows to expose types so that resources are consistent and always follow the rules enforced by the respoctive types.

I also love using Typescript for it's intellisense through types. It allows for faster development and much better and understandable codebase.

## Start Command
`yarn start` - Transpiles the source code into js build and runs it using node.

## Resources and References
Following sources were referred to while working on this assignment.

- JWT documentation for Correct Algorithm 