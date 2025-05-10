import { api } from './api-client'

interface GetProjectsResponse {
  projects: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    createdAt: string
    ownerId: string
    organizationId: string
    description: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(org: string) {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsResponse>()

  return result
}
