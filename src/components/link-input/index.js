import * as recompose from 'recompose';
import React from 'react';

const AlbumInput = ({ link, setLink, onLinkSubmit }) => {
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        onLinkSubmit(link);
      }}>
        <input
          type="text"
          placeholder="Album link"
          onChange={(event) => setLink(event.target.value)}/>
        <input type="submit" value="Save Link" />
      </form>
  </div>
  );
};

AlbumInput.propTypes = {
  link: React.PropTypes.string.isRequired,
  onLinkSubmit: React.PropTypes.func.isRequired,
  setLink: React.PropTypes.func.isRequired,
};

const enhance = recompose.withState('link', 'setLink', '');
export default enhance(AlbumInput);
