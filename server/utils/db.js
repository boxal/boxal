export function sanitize(doc) {
  return Object.keys(doc).reduce((sanitized, key) => {
    if (['_id', '__v'].includes(key)) {
      return sanitized;
    }
    return { ...sanitized, [key]: doc[key] };
  }, {});
}

export function toObject(doc) {
  return doc.toObject();
}
