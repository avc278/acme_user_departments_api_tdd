const express = require('express');
const app = express();
const db = require('./db');
const { User, Department } = db.models;

const port = 3000;
app.use(express.json());

app.use(require('cors')());

app.get('/api/users', async(req, res, next) => {
    try {
        res.send(await User.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(next);
});

// app.put('/api/users', async(req, res, next) => {
//     User.create(req.body)
//         .then(user => res.status(201).send(user))
//         .catch(next);
// });

// POST - returns a new user - posted data will be { name: 'name', departmentId: 'departmentId'}
// PUT - returns an updated user -posted data will be { name: 'name', departmentId: 'departmentId'}
// DELETE - deletes a user

app.listen(port);

module.exports = app;