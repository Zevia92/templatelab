import { createClient } from '@/lib/supabase-server.js'
import { createAdminClient } from '@/lib/supabase-admin.js'

export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return Response.json({ user: null, subscription: null })
  }

  const admin = createAdminClient()

  const { data: subscription } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  return Response.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
    },
    subscription,
  })
}
