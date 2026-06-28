import { createClient } from '@/lib/supabase-server.js'

export async function POST() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return Response.json({ success: true })
}
