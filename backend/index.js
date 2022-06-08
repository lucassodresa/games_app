require('dotenv').config();
require('./webSocket');
const { serverHttp } = require('./http');
const PORT = process.env.PORT || 3001;

serverHttp.listen(PORT, () => console.log('Server running!'));
