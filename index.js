const express = require('express');
const db = require('./data/db.js');
const server = express();
const port = 3000; 
server.listen(port, () => console.log('...Port 3000 knows what you did last summer...'))
server.use(express.json());


//GET
server.get('/', (req, res)=> {
    console.log('Shh. User data is near.')
});

server.get('/api/users', (req, res)=> {
    db.find()
    .then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        console.log('Error:', err);
        res.status(500).json({error: 'Failed to get users.'});
    });
});

server.get(`/api/users/:id`, (req, res)=> {
    const id = req.params.id;
    db.find(id)
    .then(user=>{
        res.status(200).send(user);
    }) 
    .catch(err=>{
        console.log('Error:', err);
        res.status(500).json({error: 'Failed to get user by id.'});
    });
});


//POST
server.post('/api/users', (req, res)=> {
    const newUser = req.body;
    console.log('newUser data:', newUser);

    db.post(newUser)
        .then(user=> {
            res.status(201).json(user);
        })
        .catch(err=> {
            console.log('Error:', err);
            res.status(500).json({error: 'Unable to add new user.'});
        });
});


//PUT
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.find(id).then(user=>{
        res.status(200).send(user)
    })
    .catch(err=> {
        console.log('Error:', err);
        res.status(500).json({error: `Failed to find user by id ${id}`});
    });
});


//DELETE
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id).then(count=> {
        res.status(200).json({message: `Twas deleted.`});
    })

    .catch(err=>{
        console.log('Error:', err);
        res.status(500).json({error: 'Failed to delete user by id.'});
    });
});


