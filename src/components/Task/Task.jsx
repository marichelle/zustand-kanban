import classNames from 'classnames'
import PropTypes from 'prop-types'
import './task.css'

const STATUS = 'ONGOING'

function Task({ title }) {
  return (
    <div className="task">
      <div>{title}</div>
      <div className="bottomWrapper">
        <div></div>
        <div className={classNames('status', STATUS)}>{STATUS}</div>
      </div>
    </div>
  )
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Task
