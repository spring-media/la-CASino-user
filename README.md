# la-CASino-user

Small js library that gives you information about user login and abo state.

### Install:
    npm install -save-dev git+https://git@github.com:WeltN24/la-CASino-user.git

### Usage of library:

*Typescript*:
```ts
import { UserService } from "la-CASino-user";

const user = UserService.getUser();
user.isUserLoggedIn();
```

*Javascript*:
```js
const user = require('la-CASino-user').user;

user.isUserLoggedIn();
```

### Development:

Use following commands during development:

    npm run test
    npm run build
   