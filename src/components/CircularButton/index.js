import "./style.less";
import React from 'react';
import Icon from '../Icon';

/**
 * Component of a button that shows a text and it has a custom style
 * @param {String} iconName // possible values are 'settings', 'indicator', 'plane', 'trash' and 'recording'
 * @param {String} iconSize // possible values are 'small", 'medium' and 'big'
 * @param {Boolean} isRecording // Only its used to create pulse animation on big button
 * @param {Function} onClick // Funtion that it call when button is clicked
 * @returns 
 */
const CircularButton = ({iconName, iconSize, isRecording, onClick}) => {
  const buttonClasses = `circular-button ${iconName}-button ${iconSize}-button ${isRecording ? "is-recording" : ""}`;
  return  (
    <button className={buttonClasses} onClick={onClick}>
      <div className="circle-1">
        <div className="circle-2">
          <Icon iconName={iconName}/>
        </div>
      </div>
    </button>
  );
};

export default CircularButton;
