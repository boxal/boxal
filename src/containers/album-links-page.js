import React from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
import LinkInput from '../components/link-input';
import Container from '../components/ui/container';
import * as AlbumActionCreators from '../action-creators/album';
import * as SocketActionCreators from '../action-creators/socket';

import * as C from '../constants';
import SocketIO from 'socket.io-client';

const socket = SocketIO.connect('http://localhost:3000/');

const AlbumLinksPage = ({ albumLinks, dispatch }) => {
  return (
    <Container size={4} center>
      <h2 className="caps">Page to enter and display album links</h2>
      <LinkInput onLinkSubmit={(dropboxLink) => {
        dispatch(AlbumActionCreators.saveAlbumToDB({ dropboxLink }));
        dispatch(SocketActionCreators.scrapeAlbumImages({ dropboxLink }));
        socket.emit(C.SOCKET_ACTIONS.SCRAPE_ALBUM_IMAGES, {
          url: dropboxLink,
        });
      }}/>
      <div className="qa-album-links">
        {
          albumLinks.map((albumLink, i) => {
            return <div key={i}> {albumLink} </div>;
          })
        }
      </div>
    </Container>
  );
};


socket.on(C.SOCKET_ACTIONS.ALBUM_IMAGE_SRCSET, ({ srcset }) => {
  const image = document.createElement('img');
  image.srcset = srcset;
  document.body.appendChild(image);
});

AlbumLinksPage.propTypes = {
  albumLinks: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export { AlbumLinksPage as Component };

export default connect(
  mapStateToProps,
)(AlbumLinksPage);

function mapStateToProps(state) {
  return {
    albumLinks: Selectors.getAlbumLinks(state),
  };
}
