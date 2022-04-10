const http = require('http');
const port = process.env.PORT || 8080;
const userRoutes = require('./routes.js');

const server = http.createServer(userRoutes);

server.listen(port, () => {
   console.log(`Aplicación ejecutandose en el puerto: ${port}`);
});
