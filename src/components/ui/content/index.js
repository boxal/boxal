import React from 'react';

function Content({
  children,
  isVisible = true,
}) {
  return (
    <div style={style[isVisible]}>
      {isVisible ? children : null}
    </div>
  );
}

const style = {
  [true]: {},
  [false]: {
    display: 'none',
  },
};

Content.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
};

export default Content;
