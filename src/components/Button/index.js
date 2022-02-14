import "./style.less"
import React from 'react';

/**
 * Component of a button that shows a text and it has a custom style
 * @param {String} buttonText // text that shows the button
 * @param {String} buttonSize // This parameter could be 'regular', 'large' or null.
 *                            // If this parameter is not passed, it is considered regular
 * @returns 
 */

const Button = ({buttonText, buttonSize, onClick}) => {
  const buttonClasses = `button ${buttonSize}-button`;
  return (
    <button className={buttonClasses} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
