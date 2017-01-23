# la-CASino-user

Small js library that gives you information about user login and abo state.

### Install:
    npm install -save-dev git+https://git@github.com:WeltN24/la-CASino-user.git

### Usage of library:

*Typescript*:
```ts
import * as user from "la-CASino-user";

// get data about current user
user.getUser();

user.isUserLoggedIn();
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
   