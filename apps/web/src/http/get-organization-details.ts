import { api } from './api-client'

interface GetOrganizationDetailsResponse {
  organization: {
    id: string
    ownerId: string
    name: string
    slug: string
    domain: string | null
    avatarUrl: string | null
    shouldAttachUsersByDomain: boolean
    createdAt: string
    updatedAt: string
  }
}

export async function getOrganizationDetails(org: string) {
  const result = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationDetailsResponse>()

  return result
}
