import { request } from '../utils';

export async function create (params) {
  return request('/api/product', {
    method: 'post',
    data: params
  })
}


export async function query (params) {
  return request('/api/products', {
    method: 'get',
    data: params
  })
}
