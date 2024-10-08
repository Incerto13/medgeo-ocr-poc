import React from 'react';
import PropTypes from 'prop-types';

import './circleButton.css';

interface props {
  onClick: any
  isClicked: any
}

export const CircleButton = ({ onClick, isClicked }: props) => {
  const innerCircleClasses = isClicked ? 'is-clicked' : '';
  return (
    <div id="container-circles">
      <div
        id="outer-circle"
        onClick = {
          (e) => {
            if (!isClicked) {
              onClick();
            }
          }
        }
      >
        <div id="inner-circle" className={innerCircleClasses}>
        </div>
      </div>
    </div>
  );
};

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired
};

export default CircleButton;