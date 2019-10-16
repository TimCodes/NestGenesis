const Bcrypt = require('bcrypt');

const salt = Bcrypt.genSaltSync(10);
const hash = Bcrypt.hash('password', salt);

hash.then(r => console.log(r)).catch(e => console.log(e));
console.log(hash);
