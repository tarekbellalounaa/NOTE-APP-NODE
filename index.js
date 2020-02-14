const fs = require('fs')

help = () => {
    console.log("node index.js help \t\t\t to display help");
    console.log("node index.js add \t\t\t to add new todo");
    console.log("node index.js remove \t\t\t to remove todo");
    console.log("node index.js list \t\t\t to list all todos");
}

add = () => {
    let newTodo = {}

    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || typeof process.argv[titleIndex + 1] === "undefined"){
        console.log("Missing required arguments!");
        return
    }
    else {
        newTodo.Title = process.argv[titleIndex + 1]
    }

    let bodyIndex = process.argv.findIndex(el => el === "--body")
    if(bodyIndex === -1 || typeof process.argv[bodyIndex + 1] === "undefined"){
        console.log("Missing required arguments!");
        return
    }
    else {
        newTodo.Body = process.argv[bodyIndex + 1]
    }
    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    fs.writeFileSync('todos.json', JSON.stringify(todos.concat(newTodo)))
}

list = () => {
    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    console.log(`You have ${todos.length} todos:`);
    todos.map(el => console.log(`Title: ${el.Title} \t Body: ${el.Body}`))
}

remove = () => {
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || typeof process.argv[titleIndex + 1] === "undefined"){
        console.log("Missing required arguments!");
        return
    }else {
        let todos = JSON.parse(fs.readFileSync('todos.json').toString())
        let toDelete = todos.find(el => el.Title === process.argv[titleIndex + 1])
        let newTodos = todos.filter(el => el.Title !== process.argv[titleIndex + 1])
        fs.writeFileSync('todos.json', JSON.stringify(newTodos))
        if(toDelete){
            console.log(`Title: ${toDelete.Title}, Body: ${toDelete.Body} has been deleted successfuly`);
        }
    }
}
read = () => {
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || typeof process.argv[titleIndex + 1] === "undefined"){
        console.log("Missing required arguments!");
        return
    }else{
        let todos = JSON.parse(fs.readFileSync('todos.json').toString())
        let todo = todos.find(el => el.Title === process.argv[titleIndex + 1])
        if(todo){
            console.log(`Title: ${todo.Title}, Body: ${todo.Body}`);
        }else{
            console.log('Todo Not Found!');
        }
    }
}
switch(process.argv[2]){
    case 'help': help(); break;
    case 'add': add(); break;
    case 'list': list(); break;
    case 'read': read(); break;
    case 'remove': remove(); break;
    default: help()
}