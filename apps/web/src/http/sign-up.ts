import { api } from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpRequest) {
  await api.post('accounts', {
    json: {
      name,
      email,
      password,
    },
  })
}
