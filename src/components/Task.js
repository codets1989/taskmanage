
import React,{useEffect, useReducer, useRef} from "react";
const Task = () =>
{
    const [state,dispatch] = useReducer(handletask,{tasklist:[]})
    const prevTasklistRef = useRef();
    const TasktitleRef = useRef();
    const addtask = () =>
        {
            const title = TasktitleRef.current.value
            if (title)
            {
                const newTask = {"name":title}
                dispatch({type:'add',payload:newTask});
                TasktitleRef.current.value='';
            }
            
            console.log(state.tasklist)
        }
    useEffect(()=>{
        if (prevTasklistRef.current)
        {
            const prevTasklist = prevTasklistRef.current;
            const newTasklist = state.tasklist;
            const addedTasks = newTasklist.filter(task=> !prevTasklist.some(prev => prev.name === task.name));
            const removedTasks = prevTasklist.filter(task=> !newTasklist.some(newTask=>newTask.name === task.name))
            console.log(addedTasks)
            console.log(removedTasks)
        }
        prevTasklistRef.current = state.tasklist
    },[state.tasklist])    
    function handletask (state,action)
    {
        switch(action.type)
        {
            case 'add':
                return {...state,tasklist:[...state.tasklist,action.payload]}
            case 'delete':
                return {...state,tasklist:[state.tasklist.filter((task)=> task.name !==action.payload.name)]}
            default:
                return state      

                

        }
    }
    return(
        <div>
            <input type="text" placeholder="Enter task title" ref={TasktitleRef} />
           <button onClick={addtask}>Add Task</button>
           <ul>
              {state.tasklist.map((task,index)=>(
                <li key={index}>{task.name}</li>
              ))}
           </ul>
        </div>
    )
};
export default Task;