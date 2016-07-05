import * as winston from 'winston';

export function log(...args) {
  winston.log(...args);
}

export function error(...args) {
  winston.error(...args);
}
