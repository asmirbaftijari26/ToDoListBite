function TodoTable(props){
 return(
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Due Date</th>  
                    </tr>
                    {
                        props.todos.map((todo, index) =>
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{todo.description}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{todo.duedate}</td>
                            <td><button onClick={() => props.handleDelete(index)}>Done</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
 )
}
 
export default TodoTable;
 