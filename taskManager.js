const fs = require('fs');
const path = require('path');
const readline = require('readline');

const TASK_FILE = 'tasks.txt';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addTask(task) {
    fs.appendFile(TASK_FILE, task + '\n', (err) => {
        if (err) throw err;
        console.log('Task added successfully!');
        rl.prompt();
    });
}

function viewTasks() {
    fs.readFile(TASK_FILE, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('No tasks found.');
            } else {
                throw err;
            }
        } else {
            if (data.trim() === '') {
                console.log('No tasks found.');
            } else {
                console.log('Tasks:');
                console.log(data);
            }
        }
        rl.prompt();
    });
}

function markComplete(taskIndex) {
    fs.readFile(TASK_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.trim().split('\n');
        if (taskIndex >= 0 && taskIndex < tasks.length) {
            tasks[taskIndex] += ' - Completed';
            fs.writeFile(TASK_FILE, tasks.join('\n'), (err) => {
                if (err) throw err;
                console.log('Task marked as complete!');
                rl.prompt();
            });
        } else {
            console.log('Invalid task index.');
            rl.prompt();
        }
    });
}

function removeTask(taskIndex) {
    fs.readFile(TASK_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        let tasks = data.trim().split('\n');
        if (taskIndex >= 0 && taskIndex < tasks.length) {
            tasks.splice(taskIndex, 1);
            fs.writeFile(TASK_FILE, tasks.join('\n'), (err) => {
                if (err) throw err;
                console.log('Task removed successfully!');
                rl.prompt();
            });
        } else {
            console.log('Invalid task index.');
            rl.prompt();
        }
    });
}

function displayMenu() {
    console.log('Task Manager');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');
    rl.prompt();
}

rl.on('line', (input) => {
    switch (input.trim()) {
        case '1':
            rl.question('Enter task: ', (task) => {
                addTask(task);
            });
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            rl.question('Enter task index to mark as complete: ', (index) => {
                markComplete(parseInt(index));
            });
            break;
        case '4':
            rl.question('Enter task index to remove: ', (index) => {
                removeTask(parseInt(index));
            });
            break;
        case '5':
            rl.close();
            break;
        default:
            console.log('Invalid option.');
            rl.prompt();
            break;
    }
}).on('close', () => {
    console.log('Exiting task manager.');
    process.exit(0);
});

displayMenu();
