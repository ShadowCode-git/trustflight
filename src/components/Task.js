import React, { Component } from 'react';
import * as controller from '../store/controller.js'

class Task extends Component {

    
    componentDidMount() {
        document.getElementById(this.props.task.id).checked = this.props.task.done;
    }
    render() {
        var task = this.props.task
        return (
            <div className='task-container'>
                <button id='remove' onClick={() => controller.deleteTask(task.id)}>&#10006;</button>
                <label>Task:</label>
                <p>{task.text}</p>
                <label>Assigned:</label>
                <b>{controller.getEngineersName(task.personID)}</b> <input type='checkbox' id={task.id} onClick={() => controller.taskDone(task.id)}></input>
            </div>
        );
    }
}

export default Task;