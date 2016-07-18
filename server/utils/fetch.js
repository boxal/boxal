import nodeFetch from 'node-fetch';
import checkStatus from '../../src/utils/api/check-status';
import parseJSON from '../../src/utils/api/parse-json';

export default function fetch(...args) {
  return nodeFetch(...args).then(checkStatus).then(parseJSON);
}
