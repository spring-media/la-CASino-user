# la-CASino-user

Small js library that gives you information about user login and abo state.

### Install:
    npm i -D github:WeltN24/la-CASino-user

### Usage of library:

*Typescript*:
```ts
import * as user from "la-CASino-user";

// get data about current user
user.getUser();

// get purchased products 
user.getUser().products;

user.isUserLoggedIn();
user.isUserSessionExpired();
```

*Javascript*:
```js
const user = require('la-CASino-user');

user.isUserLoggedIn();
```

### Development:

Use following commands during development:

    npm run test
    npm run build
   
