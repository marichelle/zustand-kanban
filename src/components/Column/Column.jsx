import PropTypes from 'prop-types'
import { useState } from 'react'

import Modal from '../Modal/Modal'
import Task from '../Task/Task'
import { useStore } from '../../store/store'
import './column.css'

function Column({ label }) {
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  /*
   * NOTE: Whenever the return value of the useStore
   * selector changes, Zustand will trigger a re-render.
   */
  const addTask = useStore(store => store.addTask)
  const allTasks = useStore(store => store.tasks)
  const filteredTasks = allTasks.filter(task => task.status === label)

  const handleChange = e => setInput(e.target.value)

  const handleSubmit = () => {
    addTask(input, label)
    setInput('')
    setOpen(false)
  }

  const toggleModal = () => setOpen(prevState => !prevState)

  return (
    <>
      <div className="column">
        <div className="titleWrapper">
          <p>{label}</p>
          <button onClick={toggleModal}>Add</button>
        </div>

        {filteredTasks.map(({ id }) => (
          <Task key={id} id={id} />
        ))}
      </div>

      <Modal close={toggleModal} isOpen={open}>
        <input type="text" value={input} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </Modal>
    </>
  )
}

Column.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Column
