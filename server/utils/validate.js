import * as Joi from 'joi';

const AlbumSchema = Joi.object().keys({
  dropboxLink: Joi.string().required(),
  facebookUserId: Joi.string().required(),
});

export function album(doc) {
  return Joi.attempt(doc, AlbumSchema);
}
