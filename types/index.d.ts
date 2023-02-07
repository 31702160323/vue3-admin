import type { RouteRecordRaw } from 'vue-router';
declare global {
  type SimpleRoute = Pick<
    RouteRecordRaw,
    'fullPath' | 'hash' | 'meta' | 'name' | 'params' | 'path' | 'query'
  >;
}
