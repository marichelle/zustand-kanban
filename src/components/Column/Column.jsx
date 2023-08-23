import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './column.css'

function Column({ label }) {
  return (
    <div className="column">
      <p>{label}</p>
      <Task title="Todo" />
    </div>
  )
}

Column.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Column
