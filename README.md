## Name: 
Logan Sailer
## Time to complete: 
Roughly 7 hours
## Steps taken: 
The structure of the assignment really encourages it to be implemented piece by piece, which is what I did. For example, I implemented and heavily tested registering a user before logging in, I had to login before sending a message, and I had to send a message before searching messages.
## Issues with structure: 
I would say the biggest issue with the structure is the lack of keeping track of a user throughout. The user is not saved across the session which requires the requests to send its own user_id every time, which isn't efficient if a user is already logged in. There is also a lack of authentication throughout: It is not required login to view messages between users or to view users, which is a massive security vulnerability. I added a required authentication token to send messages as a proof of concept, but didn't implemente it across the project so reviewers can call them as the requirements show.
## Suggested improvements:
### Security: 
As I touched on above, it didn't seem secure for any user to be able to message any other user without authentication: I wanted to implement a way to confirm the user sending a message was the user that was logged in, so I signed send_message with a JSON Web Token to confirm identity. Another security step I took was hashing the passwords with bcrypt so that the database never saved the passwords directly. I also implemented SQL queries using Knex rather than raw SQL as a preventative measure against SQL injection. I also am keeping the .env in the repo for ease of setup, but with passwords removed so a reviewer can use their own.
### Usability: 
Obviously, in its current implementation this backend is difficult to use as it has no user interface, it can only be hit by a tool like Postman. Adding a frontend would be the next step to make this a functioning Full Stack application. With it just being a backend, however, I think it is fairly usable, with errors logged well, several validation check, and good amount of failsafes in place.
### API Design:  
If I redesigned the requirements, I would save the user token on log in, and use it across the user specific requests like send_message, view_messages, and list_all_users so that an unauthenticated user couldn't perform those actions and the post requests wouldn't require the user_id. 