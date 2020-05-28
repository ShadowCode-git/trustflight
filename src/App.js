import React, { Component } from 'react';
import './App.css';
import * as controller from './store/controller.js'
import Task from './components/Task'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            tasks: []
        };
      }

    componentDidMount() {
        this.setState({tasks: controller.getTasks()})
    }
    resetValues() {
        document.getElementById('newtask').value = ''
        document.getElementById('e_name').value = ''
        document.getElementById('e_role').value = ''
        this.setState({tasks: controller.getTasks()})
    }

    addTask() {
        controller.addTask(document.getElementById('newtask').value, document.getElementById('newtask_e').value)
        this.resetValues();
    }

    addEngineer() {
        controller.addEngineer( document.getElementById('e_name').value, document.getElementById('e_role').value)
        this.resetValues()
    }
    handleView() {
        var user = document.getElementById('view').value;
        document.getElementById('admin-panel').classList.remove('hide')
        this.setState({tasks: controller.getTasks()})
        if( user > 0) {
            document.getElementById('admin-panel').className = 'hide'
            this.setState({ tasks: controller.getTaskforEngineer(user) });
            
        }
    }
  
    render() {
        return (
            <div className='body'>
                <label>Pick an user: </label>
                <select id='view' onChange={() => this.handleView()}>
                    <option value={0}>Admin</option>
                    {controller.getEngineers().map((value,index) => {
                        return (<option value={value.id}>{value.name}</option>)
                    })}
                </select>


            <div id='admin-panel' >
                <div style={{"display":"block"}}>
                    <label>Task:</label><br/>
                    <textarea id='newtask'/><br/>
                    <label>Engineer:</label>
                    <select id='newtask_e'>
                    {controller.getEngineers().map((value,index) => {
                        return (<option value={value.id}>{value.name}</option>)
                    })}
                    </select>
                    <br/>
                    <button onClick={() => this.addTask()}>Add task</button>
                </div>
                <div className='center'>
                    <label>Name:</label><br/>
                    <input id='e_name'/><br/>
                    <label>Role:</label><br/>
                    <input id='e_role'/><br/>
                    <button onClick={() => this.addEngineer()}>Add Engineer</button>
                </div>
            </div>


            {this.state.tasks.map((value, index) => {
                return (
                    <Task key={index} task={value}/>
                )
            })}
            </div>
        );
    }
}

export default App;