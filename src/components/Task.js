
import React,{useEffect, useReducer, useRef,useMemo,useCallback} from "react";
import useLocalStorage from './useLocalStorage'
const Task = () =>
{
    const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
    const [state,dispatch] = useReducer(handletask,{tasklist:storedTasks})
    const prevTasklistRef = useRef();
    const TasktitleRef = useRef();
    const intervalRef = useRef()
    const addtask = useCallback( () =>
        {
            const title = TasktitleRef.current.value
            if (title)
            {
                const newTask = {"name":title,"id":Date.now(),"completed":false}
                dispatch({type:'add',payload:newTask});
                TasktitleRef.current.value='';
            }
            
            console.log(state.tasklist)
        },[])
    const toggleTask = useCallback(name => {
            dispatch({ type: "toggle", payload: { name } });
        }, []);  
    const deletetask = useCallback(name => {
        dispatch({type:"delete",payload:{name}})
    },[] )   
    const totaltasks = useMemo(()=> state.tasklist.length,[state.tasklist])
    const completedtasks = useMemo(()=>state.tasklist.filter(task=>task.completed).length,[state.tasklist])
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
        intervalRef.current = setInterval(() => {
            console.log("Interval is running every 5 seconds!");
           
        }, 5000);
        return () => {
            clearInterval(intervalRef.current); 
            console.log("Interval cleared");
        };
    },[state.tasklist])    
    useEffect(() => {
        setStoredTasks(state.tasklist); 
    }, [state.tasklist, setStoredTasks]);
    function handletask (state,action)
    {
        switch(action.type)
        {
            case 'add':
                return {...state,tasklist:[...state.tasklist,action.payload]}
            case 'delete':
                return {...state,tasklist:state.tasklist.filter((task)=> task.name !==action.payload.name)}
            case 'toggle':
                return {...state,tasklist:state.tasklist.map((task)=>task.name === action.payload.name?{...task,completed:!task.completed}:task)}
            default:
                return state      

                

        }
    }
    return(
        <div>
            <input type="text" placeholder="Enter task title" ref={TasktitleRef} />
           <button onClick={addtask}>Add Task</button>
           <p>Total Tasks:{totaltasks}</p>
           <p>Completed Tasks:{completedtasks}</p>
           <ul>
              {state.tasklist.map((task)=>(
                <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.name}
                <button onClick={()=>toggleTask(task.name)}> {task.completed ? "Undo" : "Complete"}</button>
                <button onClick={()=>deletetask(task.name)}>Delete</button>
                </li>
              ))}

           </ul>
        </div>
    )
};
export default Task;