import { request } from '../utils';

export async function create (params) {
  return request('/api/vendor', {
    method: 'post',
    data: params
  })
}

export async function query (params) {
  return request('/api/vendors', {
    method: 'get',
    data: params
  })
}
