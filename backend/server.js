const express = require('express');
const axios = require('axios');
const uuid = require('uuid');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());

const tasks = [];

class Task {
    constructor(options) {
        this.id = uuid.v4();
        this.fname = options.fname;
        this.lname = options.lname;
        this.city = options.city;
        this.state = options.state;
        this.task = options.task;
        this.age = options.age;
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/landing.html');
});

app.get('/gethelp', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.post('/taskformsubmit', (req, res) => {
    const task = new Task(req.body);
    tasks.push(task);
    console.log(tasks);
    res.sendFile(__dirname + '/public/html/submitted.html');
});

app.get('/helpers', (req, res) => {
    res.sendFile(__dirname + '/public/html/helpers.html');
});

app.get('/getnearbyactivities/:city/:state/:age', (req, res) => {
    axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{
            role: 'user',
            content: `Find me local activities in ${req.params.city}, ${req.params.state} for a ${req.params.age}. only give me pois no title`
        }]
    }, {
        headers: {
            'Authorization': 'Bearer'
        }
    }).then(output => {
        console.log(output.data.choices[0].message.content.split('\n').filter(item => item.trim() !== ''));
        console.log(output.data);
        res.send(output.data.choices[0].message.content.split('\n').filter(item => item.trim() !== ''));
    }).catch(error => {
        console.error(error);
        res.send(error);
    });
});

app.get('/gettasks', (req, res) => {
    res.json(tasks);
});

app.get('/submitted', (req, res) => {
    res.sendFile(__dirname + '/public/html/submitted.html');
});

app.post('/accepttask', (req, res) => {
    const taskId = req.body.task.id;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            tasks.splice(i, 1);
        }
    }
    res.json(tasks);
});

app.listen(3000, () => {
    console.log('http://localhost:3000/') 
});
