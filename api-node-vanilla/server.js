import http from 'http';

// import our data

// import data from "./data/data.json" assert { type: 'json'}; // deprecated
// import data from "./data/data.json" with {type: 'json'} // not yet available

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require("./data/data.json");


// PORT

const PORT = 3000;

// server

const server = http.createServer((request, response) => {

    // get all users

    if (request.url === "/users" && request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(data.users));
    }

    // get one single user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "GET") {
        try {
            let userId = request.url.split('/')[2];
            let user = data.users.find(user => user.id === parseInt(userId));
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(user))
        } catch (error) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: error.message }));
        }
    }

    // create new user

    else if (request.url === "/users" && request.method === "POST") {
        try {
            let body = ""
            request.on("data", (data) => {
                body += data.toString();
            })
            request.on('end', () => {
                const newUser = JSON.parse(body);
                newUser.id = Math.max(...data.users.map((user) => user.id), 0) + 1;
                data.users.push(newUser);

                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(newUser));
            });
        } catch (error) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: error.message }));
        }
    }

    // edit user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "PUT") {
        try {
            const id = request.url.split('/')[2];
            let body = "";

            request.on("data", (data) => {
                body = data.toString();
            })
            request.on('end', () => {
                const updatedUser = JSON.parse(body);
                let userIndex = data.users.findIndex((user) => user.id === parseInt(id));
                data.users[userIndex] = { ...updatedUser };

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(data.users));
            });
        } catch (error) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: error.message }));
        }
    }

    // delete user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "DELETE") {
        try {
            let userId = request.url.split('/')[2];
            const userIndex = data.users.findIndex(user => user.id === parseInt(userId));

            if (userIndex !== -1) {
                data.users.splice(userIndex, 1);

                response.writeHead(204, { 'Content-Type': 'application/json' });
                response.end();
            }
        } catch (error) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: error.message }));
        }
    }

    else {
        response.end("This is the response for an invalid route.")
    }
})

server.listen((PORT), () => {
    console.log(`Server listening on port ${PORT}`)
});
