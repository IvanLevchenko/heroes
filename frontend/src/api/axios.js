import axios from 'axios'
export const _axios = axios.create({baseURL: 'https://my-heroes-list.herokuapp.com/api/v1'})