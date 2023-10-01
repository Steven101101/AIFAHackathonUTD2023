class Task {
    constructor(options) {
        this.id = options.id;
        this.fname = options.fname;
        this.lname = options.lname;
        this.city = options.city;
        this.state = options.state;
        this.age = options.age;
        this.task = options.task;
    }

    display() {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = this.id;
        //---------
        const pEl = document.createElement('p');
        const fnameEl = document.createElement('h1');
        const lnameEl = document.createElement('h2');
        const location = document.createElement('h4');
        const ageEl = document.createElement('h5');
        const acceptBtn = document.createElement('button');
        //---------
        pEl.innerText = this.task;
        fnameEl.innerText = this.fname;
        lnameEl.innerText = this.lname;
        ageEl.innerText = this.age;
        location.innerText = `${this.city}, ${this.state}`;
        acceptBtn.innerText = 'Accept';
        acceptBtn.onclick = () => acceptTask(this);
        //---------
        cardEl.append(pEl);
        cardEl.append(fnameEl);
        cardEl.append(lnameEl);
        cardEl.append(location);
        cardEl.append(ageEl);
        cardEl.append(acceptBtn);
        document.getElementsByClassName('cards-container')[0].append(cardEl);
        //---------
        if (document.getElementsByClassName('card').length > 3) {
            document.getElementsByClassName('cards-container')[0].style.marginTop = "300px";
        } else {
            document.getElementsByClassName('cards-container')[0].style.marginTop = "115px";
        }
    }
}

function acceptTask(task) {
    fetch('/accepttask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task }),
    }).then(res => res.json()).then(res => {
        window.location = '/submitted';
    }).catch(error => {
        alert('Error accepting task:', error);
    });
}

fetch('/gettasks').then(tasks => tasks.json()).then(tasks => {
    if (tasks.length !== 0) {
        tasks.forEach(task => {
            new Task(task).display();
        });
    }
});
