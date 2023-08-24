import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useState } from 'react'

import Modal from '../Modal/Modal'
import Task from '../Task/Task'
import { useStore } from '../../store/store'
import './column.css'

function Column({ status }) {
  const [drop, setDrop] = useState(false)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  /*
   * NOTE: Whenever the return value of the useStore
   * selector changes, Zustand will trigger a re-render.
   */
  const addTask = useStore(store => store.addTask)
  const allTasks = useStore(store => store.tasks)
  const draggedTask = useStore(store => store.draggedTask)
  const filteredTasks = allTasks.filter(task => task.status === status)
  const moveTask = useStore(store => store.moveTask)
  const setDraggedTask = useStore(store => store.setDraggedTask)

  const handleChange = e => setInput(e.target.value)

  const handleDragLeave = e => {
    e.preventDefault()
    setDrop(false)
  }

  const handleDragOver = e => {
    /*
     * Prevent opening new files, new tabs, etc.
     * The Drag & Drop API won't react to our
     * custom events if we don't add this.
     */
    e.preventDefault()
    setDrop(true)
  }

  const handleDrop = () => {
    moveTask(draggedTask, status)
    setDraggedTask(null)
    setDrop(false)
  }

  const handleSubmit = () => {
    addTask(input, status)
    setInput('')
    setOpen(false)
  }

  const toggleModal = () => setOpen(prevState => !prevState)

  return (
    <>
      <div
        className={classNames('column', { drop })}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="titleWrapper">
          <p>{status}</p>
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
  status: PropTypes.string.isRequired,
}

export default Column
