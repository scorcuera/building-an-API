import http from 'http';

// PORT

const PORT = 3000;

// server

const server = http.createServer((request, response) => {
    response.write("Ready to go !")
})

server.listen((PORT), () => {
    console.log(`Server listening on port ${PORT}`)
});
