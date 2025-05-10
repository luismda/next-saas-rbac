import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const orgSlug = await getCurrentOrg()
  const permissions = await ability()

  const canGetProjects = permissions?.can('get', 'Project')
  const canGetMembers = permissions?.can('get', 'User')

  const canGetBilling = permissions?.can('get', 'Billing')
  const canUpdateOrganization = permissions?.can('update', 'Organization')

  return (
    <div className="border-b py-4">
      <div className="mx-auto flex max-w-[1200px] flex-row items-center gap-2">
        {canGetProjects && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
            asChild
          >
            <NavLink href={`/org/${orgSlug}`}>Projects</NavLink>
          </Button>
        )}

        {canGetMembers && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
            asChild
          >
            <NavLink href={`/org/${orgSlug}/members`}>Members</NavLink>
          </Button>
        )}

        {(canGetBilling || canUpdateOrganization) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
            asChild
          >
            <NavLink href={`/org/${orgSlug}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </div>
    </div>
  )
}
