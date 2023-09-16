import http from 'http';

// PORT

const PORT = 3000;

// server

const server = http.createServer((request, response) => {

    // get all users

    if (request.url === "/users" && request.method === "GET") {
        response.end("This is the response against the GET request.")
    }

    // get one single user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "GET") {
        response.end("This is the response against the GET request.")
    }

    // create new user

    else if (request.url === "/users" && request.method === "POST") {
        response.end("This is the response against the POST request.")
    }

    // edit user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "PUT") {
        response.end("This is the response against the PUT request.")
    }

    // delete user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "DELETE") {
        response.end("This is the response against the DELETE request.")
    }

    else {
        response.end("This is the response for an invalid route.")
    }
})

server.listen((PORT), () => {
    console.log(`Server listening on port ${PORT}`)
});
