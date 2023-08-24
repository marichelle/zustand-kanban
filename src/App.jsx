import Column from './components/Column/Column'
import { COLUMNS } from './constants/columns'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>My Zustand Kanban Board</h1>
      <div className="board">
        {COLUMNS.map(column => (
          <Column key={column} status={column} />
        ))}
      </div>
    </div>
  )
}

export default App
