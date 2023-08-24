import classNames from 'classnames'
import PropTypes from 'prop-types'

import TrashIcon from '../../assets/trash.svg'
import { useStore } from '../../store/store'
import './task.css'

function Task({ id }) {
  const deleteTask = useStore(store => store.deleteTask)
  const task = useStore(store => store.tasks.find(task => task.id === id))

  return (
    <div className="task">
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <button className="deleteButton" onClick={() => deleteTask(id)}>
          <img src={TrashIcon} />
        </button>
        <div className={classNames('status', task.status)}>{task.status}</div>
      </div>
    </div>
  )
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Task
