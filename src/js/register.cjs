const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const usersFile = path.join(__dirname, "../json/users.json");

    fs.readFile(usersFile, (err, data) => {
        if (err) {
            console.error("Error reading users file:", err);
            return res.status(500).json({ error: "Error reading users file" });
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return res.status(500).json({ error: "Error parsing users file" });
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: "This email is already registered" });
        }

        const newUser = {
            id: users.length + 1,
            firstName,
            email,
            password,
        };

        users.push(newUser);

        fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Error saving user" });
            }

            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const usersFile = path.join(__dirname, "../json/users.json");

    fs.readFile(usersFile, (err, data) => {
        if (err) {
            console.error("Error reading users file:", err);
            return res.status(500).json({ error: "Error reading users file" });
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return res.status(500).json({ error: "Error parsing users file" });
        }

        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = `token-${user.id}`;
        return res.status(200).json({ message: "Login successful", token });
    });
});

app.get("/users", (req, res) => {
    const usersFile = path.join(__dirname, "../json/users.json");
    fs.readFile(usersFile, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading users file" });
        }

        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseError) {
            res.status(500).json({ error: "Error parsing users file" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});