import React from 'react';
import PropTypes from 'prop-types';
import './whiteFlash.css';

interface props {
  isShowWhiteFlash: any
}

export const WhiteFlash = ({ isShowWhiteFlash }: props) => {
  const flashDoTransition = isShowWhiteFlash ? 'do-transition' : '';
  const flashClasses = `${flashDoTransition} normal`;

  return (
    <div id="white-flash" className={flashClasses}>
    </div>
  );
};

WhiteFlash.propTypes = {
  isShowWhiteFlash: PropTypes.bool.isRequired
};

export default WhiteFlash;