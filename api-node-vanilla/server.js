import http from 'http';

// define our data

let users = [
    {
        "id": 1,
        "user_name": "Lola",
        "user_email": "lola@factoriaf5.org"
    },
    {
        "id": 2,
        "user_name": "Celia",
        "user_email": "celia@factoriaf5.org"
    },
    {
        "id": 3,
        "user_name": "Jorge",
        "user_email": "jorge@factoriaf5.org"
    }
]

// PORT

const PORT = 3000;

// server

const server = http.createServer((request, response) => {

    // get all users

    if (request.url === "/users" && request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(users));
    }

    // get one single user

    else if (request.url.match(/\/users\/([0-9]+)/) && request.method === "GET") {
        try {
            let userId = request.url.split('/')[2];
            let user = users.find(user => user.id === parseInt(userId));
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
                newUser.id = Math.max(...users.map((user) => user.id), 0) + 1;
                users.push(newUser);

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
