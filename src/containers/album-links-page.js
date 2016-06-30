import React from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
import LinkInput from '../components/link-input';
import Container from '../components/container';
import { addAlbumLink } from '../action-creators';

const AlbumLinksPage = ({ albumLinks, dispatch }) => {
  return (
    <Container size={4} center>
      <h2 className="caps">Page to enter and display album links</h2>
      <LinkInput onLinkSubmit={(link)=> dispatch(addAlbumLink(link))}/>
      {
        albumLinks.map((albumLink, i)=>{
          return <div key={i}> {albumLink} </div>;
        })
      }
    </Container>
  );
};

AlbumLinksPage.propTypes = {
  albumLinks: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(
  mapStateToProps,
)(AlbumLinksPage);

function mapStateToProps(state) {
  return { albumLinks: Selectors.getAlbumLinks(state) };
}
