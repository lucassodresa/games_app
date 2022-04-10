require('dotenv').config();
require('./websocket');
const { serverHttp } = require('./http');

serverHttp.listen(process.env.PORT, () => console.log('Server running!'));
