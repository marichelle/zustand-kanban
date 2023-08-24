import PropTypes from 'prop-types'
import { createRef, useEffect } from 'react'
import './modal.css'

function Modal({ children, close, isOpen }) {
  const contentRef = createRef(null)
  const wrapperRef = createRef(null)

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target) &&
        wrapperRef.current &&
        wrapperRef.current.contains(e.target)
      ) {
        close()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [close, contentRef, wrapperRef])

  if (isOpen) {
    return (
      <div className="modal" ref={wrapperRef}>
        <div className="modalContent" ref={contentRef}>
          {children}
        </div>
      </div>
    )
  }

  return null
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default Modal
