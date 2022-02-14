import "./style.less";
import React, {useEffect, useRef, useState} from 'react';
import {PopupConfig, PopupType} from './popupConstants';

/**
 * 
 * @param {PopupType} popupType // It could be 'delete-popup' or 'edit-popup'
 * @param {Object} selectedRecording // This is the recording that is being manipulated
 * @param {Function} onConfirm // Funtion that it call when confirm button is clicked
 * @param {Function} onDeny // Funtion that it call when cancel button is clicked
 * @returns 
 */
const Popup = ({popupType, selectedRecording, adviceMessage, onConfirm, onDeny}) => {

  const inputName = useRef();

  return (
    <div className="popup">
      <div className='text-container'>
        <label className='popup-title'>{PopupConfig[popupType]?.title}</label>
        <label className="popup-advice">{adviceMessage}</label>
        {
          (popupType === PopupType.EDIT_POPUP) &&
          <input
            className="popup-input"
            type="text"
            ref={inputName}
            placeholder={selectedRecording.name}/>
        }
        <div className='buttons-container'>
          {
            PopupConfig[popupType]?.buttons.map((button, index) => {
              return (
                <button 
                  key= {index}
                  className='popup-button'
                  onClick={() => button.confirmAction ? onConfirm(inputName?.current?.value || "") : onDeny()}>
                  {button.value}
                </button>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Popup;
