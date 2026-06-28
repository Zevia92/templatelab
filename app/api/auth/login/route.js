import { createClient } from '@/lib/supabase-server.js'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: 'Email et mot de passe requis' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return Response.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
      }
      throw error
    }

    return Response.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
