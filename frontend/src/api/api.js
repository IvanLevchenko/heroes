import {_axios} from './axios'

export async function createHero(data) {
  return await _axios.post('/create-hero', data, {
    headers: {
      'Content-type': 'multipart/form-data',
    }
  })
}

export async function getHeroes({maxPages, selectedPage}) {
  return await _axios.get(`/get-heroes?max=${maxPages}&selected=${selectedPage}`, {
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export async function getHero(id) {
  return await _axios.get(`/get-hero?_id=${id}`, {
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export async function changeHero(id, data) {
  console.log(data)
  return await _axios.patch(`/change-hero?_id=${id}`, data, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export async function deleteHero(id) {
  return await _axios.delete(`/delete-hero?_id=${id}`, {
    headers: {
      'Content-type': 'application/json'
    }
  })
}