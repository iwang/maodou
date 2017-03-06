import { request } from '../utils';

export async function create (params) {
  return request('/api/product', {
    method: 'post',
    data: params
  })
}
