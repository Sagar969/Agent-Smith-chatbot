import React, { useContext, useEffect, useRef } from 'react';
import { MainContext } from '../contexts/AppContext';
import { MdSend } from 'react-icons/md'

const Query = () => {
  const { changeState, isFetching } = useContext(MainContext);
  const inpRef = useRef();
  const btnRef = useRef();

  const handleSend = () => {
    if(!isFetching) {
      changeState('msg', inpRef.current.value)
      inpRef.current.value = '';
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };
  const handleFocus = () => {
    window.addEventListener('keydown', handleKeyDown)
  }
  const handleBlur = () => {
    window.removeEventListener('keydown', handleKeyDown)
  }

  useEffect(() => {
    if(isFetching) {
        btnRef.current.style.opacity = '.5';
        btnRef.current.disabled = true;
        btnRef.current.querySelector('.send-icon').classList.remove('hover-btn');
    }
    else {
        btnRef.current.style.opacity = '1';
        btnRef.current.disabled = false;
        btnRef.current.querySelector('.send-icon').classList.add('hover-btn');
    }
  }, [isFetching])

  return (
    <div className="query">
      <div className="blur"></div>
      <input
        ref={inpRef}
        type="text"
        className="query-text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button ref={btnRef} className="btn-query" onClick={handleSend}>
        <MdSend className='send-icon hover-btn' />
      </button>
    </div>
  );
};

export default Query;