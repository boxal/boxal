import React from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
import LinkInput from '../components/link-input';
import Container from '../components/ui/container';
import * as AlbumActionCreators from '../action-creators/album';

const AlbumLinksPage = ({ albumLinks, dispatch }) => {
  return (
    <Container size={4} center>
      <h2 className="caps">Page to enter and display album links</h2>
      <LinkInput onLinkSubmit={(link) => dispatch(AlbumActionCreators.addAlbumLink(link))}/>
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
