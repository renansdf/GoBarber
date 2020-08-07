import { RedisOptions } from 'ioredis';

let configPort, configHost, configPassword;
let url = process.env.REDIS_URL;
let configUrl = url?.split(':');

if (configUrl) {
  configPort = configUrl[3];
  let hostPassword = configUrl[2].split('@');
  configHost = hostPassword[1];
  configPassword = hostPassword[0];
}

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions,
  }
}

export default {
  driver: 'redis',

  config: {
    redis: {
      username: 'h',
      host: configHost,
      port: configPort,
      password: configPassword || undefined,
    },
  },
} as ICacheConfig;
