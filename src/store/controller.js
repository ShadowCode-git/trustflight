import * as data from "./data.json"


export function getTasks() {
    // First check if the data exists in the local storage and if yes take if from there
    if (localStorage.getItem('tasks')) {
        data.tasks = JSON.parse(localStorage.getItem('tasks'))
    }
        return data.tasks
}

export function getEngineers() {
    if (localStorage.getItem('engineers')) {
        data.engineers = JSON.parse(localStorage.getItem('engineers'))
    }
    return data.engineers
}

export function taskDone(taskID) {
    for(let i=0; i<data.tasks.length; i++) {
        if(data.tasks[i].id == taskID) {
            // It's more like a toggle.
            data.tasks[i].done = !data.tasks[i].done;
            break;
        }
    }
    save(); 
} 

export function addTask(text, personID) {
    var temp = 
    {
        "id": newId(data.tasks),
        "text": text,
        "personID": personID,
        "done": false,
    }
    data.tasks.push(temp);
    save()
}

export function addEngineer(name, role) {
    var temp = 
    {
        "id": newId(data.engineers),
        "name": name,
        "role": role,
    }
    data.engineers.push(temp);
    save();
}

export function save() {
    // This method saves the data from the json file in the local storage so that the data won't be lost on reload.
    var tasks = data.tasks
    var engineers = data.engineers
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('engineers', JSON.stringify(engineers));
    
}

export function deleteTask(taskID) {
    for(let i=0; i<data.tasks.length; i++) {
        if(data.tasks[i].id == taskID) {
            data.tasks.splice(i, 1);
            break;
        }
    }
    save();
    window.location.reload();
}

// Since the ID is the unique identifier for the Engineers we need to display their name and this function is useful.
export function getEngineersName(id) {
    for(let i=0; i<data.engineers.length; i++) {
        if(data.engineers[i].id == id) {
            return data.engineers[i].name
        }
    }
}

// used for different views.
export function getTaskforEngineer(id) {
    var temp = []
    for(let i=0; i<data.tasks.length; i++) {
        if(data.tasks[i].personID == id) {
            temp.push(data.tasks[i])
        }
    }
    return temp;
}


// helper function to get the new unique ID.
function newId(arr) {
    var idCount = 0 
    arr.map((value,index) => {
        if(value.id >= idCount) {
            idCount = value.id+1;
        }
    })
    return idCount;
}