/* eslint no-unused-vars: 0 */

export default function handleAPIErrors() {
  return (error, req, res, next) => {
    if (error.isJoi) {
      res.status(400).send({
        error: {
          name: error.name,
          message: error.details[0].message,
          object: error._object,
        },
      });
    } else {
      res.status(500).send({ error });
    }
  };
}
