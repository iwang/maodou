import { request } from '../utils';

export async function create (params) {
  return request('/api/order', {
    method: 'post',
    data: params
  })
}
