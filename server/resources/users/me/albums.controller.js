import db from '../../../services/db';
import * as Validate from '../../../utils/validate';
import * as UtilsDB from '../../../utils/db';

const Albums = db.get('albums');

export async function fetchAll(request, response) {
  const facebookUserId = request.user.id;
  const albums = await Albums.find({ facebookUserId });

  response.send({
    data: albums.map(UtilsDB.sanitize),
  });
}

export async function save(request, response) {
  const facebookUserId = request.user.id;
  const album = await upsert({ ...request.body, facebookUserId });

  response.status(201).send({
    data: UtilsDB.sanitize(album),
  });
}

/**
 * @todo: Can we move `Albums` and `upsert` to a collections folder?
 */

async function upsert(document) {
  const { facebookUserId, dropboxLink } = Validate.album(document);
  const query = { facebookUserId, dropboxLink };
  return await Albums.findAndModify(
    query,
    { $set: document },
    { upsert: true, new: true },
  );
}
