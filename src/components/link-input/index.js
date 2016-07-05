import * as recompose from 'recompose';
import React from 'react';

const AlbumInput = ({ link, setLink, onLinkSubmit }) => {
  return (
    <form>
      <input
        className="qa-album-link-input"
        type="text"
        placeholder="Album link"
        value={link}
        onChange={(event) => setLink(event.target.value)}/>
      <button
        type="button"
        onClick={() => {
          onLinkSubmit(link);
          setLink('');
        }}>
        Save Link
      </button>
    </form>
  );
};

AlbumInput.propTypes = {
  link: React.PropTypes.string.isRequired,
  onLinkSubmit: React.PropTypes.func.isRequired,
  setLink: React.PropTypes.func.isRequired,
};

const enhance = recompose.withState('link', 'setLink', '');
export default enhance(AlbumInput);
