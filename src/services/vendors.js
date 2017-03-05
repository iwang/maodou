import { request } from '../utils';

export async function create (params) {
  return request('/api/vendor', {
    method: 'post',
    data: params
  })
}
