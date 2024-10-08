import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function Todolist(){
    const [todo, setTodo] = useState({description: "", duedate: "", priority: ""});
    const [todos, setTodos] = useState([]);
    
    const gridRef = useRef();
 
    const [colDefs, setColDefs] = useState([
      { field: "description", filter: true, floatingFilter: true, sortable: true },
      { field: "priority", filter: true, floatingFilter: true, sortable: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
      },
      { field: "duedate", filter: true, floatingFilter: true, sortable: true }
    ])

    const handleAdd = () => {
        if(!todo.description || !todo.duedate || !todo.priority) {
            alert("Please enter a todo");
        } else {
            setTodos([todo, ...todos]);
            setTodo({description: "", duedate: "", priority: ""});
        }
    }
 
    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((_, index) => 
              gridRef.current.getSelectedNodes()[0].id != index));
        } else {
            alert("Select row first!");
        }
    }

    const handleDate = (date) => {
        if (date) {
            const formattedDate = dayjs(date).toISOString().substring(0, 10);
            setTodo({ ...todo, duedate: formattedDate });
        }
    };
 
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              
            <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="center" 
                alignItems="center"
                mt={2}
            > 
                <TextField
                    variant='standard'
                    label='Description'
                    value={todo.description}
                    onChange={(e) => setTodo({...todo, description: e.target.value})}
                />
                <TextField
                    variant='standard'
                    label='Priority'
                    value={todo.priority}
                    onChange={(e) => setTodo({...todo, priority: e.target.value})}
                />
                <DatePicker
                    label="Due Date"
                    value={todo.duedate ? dayjs(todo.duedate) : null}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} variant='standard' />}
                />

                <Button 
                    variant="contained"
                    onClick={handleAdd}>
                        Add Todo
                </Button>

                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={handleDelete}
                    endIcon={<DeleteIcon />}>
                        Delete
                </Button>
            </Stack>
            
            <div 
              className='ag-theme-material' 
              style={{ height: 500, width: '100%', }}>
              
              <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowData={todos}
                columnDefs={colDefs}
                rowSelection='single'
                animateRows={true}/>
            </div>
        </LocalizationProvider>
    );
}
 
export default Todolist;