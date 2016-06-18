import React from 'react';

function Logo() {
  return (
    <div className="flex items-center">
      <img style={styles}
        src=""
        data-ref="logo-image"
        alt="Rangle.io"/>
    </div>
  );
}

const styles = { width: 128 };

export default Logo;
