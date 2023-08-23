import Column from './components/Column/Column'
import './App.css'

function App() {
  return (
    <div className="App">
      <Column label="PLANNED" />
      <Column label="ONGOING" />
      <Column label="DONE" />
    </div>
  )
}

export default App
