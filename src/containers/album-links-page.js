import React from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
import LinkInput from '../components/link-input';
import Container from '../components/ui/container';
import * as AlbumActionCreators from '../action-creators/album';
import * as SocketActionCreators from '../action-creators/socket';
import * as I from 'immutable';

const AlbumLinksPage = ({ albumLinks, imageSrcset, dispatch }) => {
  return (
    <Container size={4} center>
      <h2 className="caps">Page to enter and display album links</h2>
      <LinkInput onLinkSubmit={(dropboxLink) => {
        dispatch(AlbumActionCreators.saveAlbumToDB({ dropboxLink }));
        dispatch(SocketActionCreators.scrapeAlbumImages({ dropboxLink }));
      }}/>
      <div className="qa-album-links">
        {
          albumLinks.map((albumLink, i) => {
            return (
              <div key={i}>
                <h1>{albumLink}</h1>
                <div className="qa-image-links">
                  {
                    imageSrcset.get(albumLink, I.List()).map((imageLink, j) => {
                      return <img key={j} srcSet={imageLink}/>;
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    </Container>
  );
};

AlbumLinksPage.propTypes = {
  albumLinks: React.PropTypes.object,
  imageSrcset: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export { AlbumLinksPage as Component };

export default connect(
  mapStateToProps,
)(AlbumLinksPage);

function mapStateToProps(state) {
  return {
    albumLinks: Selectors.getAlbumLinks(state),
    imageSrcset: Selectors.getImageSrcset(state),
  };
}
