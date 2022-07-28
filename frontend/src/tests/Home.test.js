import axios from 'axios'
import {getHeroes} from '../api/api'

jest.mock(getHeroes)

test('Get DB data', async () => {
  const response = await getHeroes()
  expect(response.status).toBe(200)
  expect(response.data).toBe('Success')
})