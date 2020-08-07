import { RedisOptions } from 'ioredis';
import { Unique } from 'typeorm';

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
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;
