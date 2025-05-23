import { ability } from '@/auth/auth'

import { InvitesList } from './invites-list'
import { MembersList } from './members-list'

export default async function MembersPage() {
  const permissions = await ability()

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="space-y-4">
        {permissions?.can('get', 'Invite') && <InvitesList />}
        {permissions?.can('get', 'User') && <MembersList />}
      </div>
    </div>
  )
}
