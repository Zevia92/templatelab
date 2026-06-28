import { createClient } from '@/lib/supabase-server.js'
import { createAdminClient } from '@/lib/supabase-admin.js'

export async function POST(request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return Response.json({ error: 'Email, mot de passe et nom requis' }, { status: 400 })
    }

    if (password.length < 6) {
      return Response.json({ error: 'Mot de passe trop court (min 6 caractères)' }, { status: 400 })
    }

    const admin = createAdminClient()

    const { data: userData, error: signUpError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        return Response.json({ error: 'Cet email est déjà utilisé' }, { status: 409 })
      }
      throw signUpError
    }

    const supabase = await createClient()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) throw signInError

    return Response.json({
      user: {
        id: userData.user.id,
        email: userData.user.email,
        name: userData.user.user_metadata.name,
      },
    })
  } catch (err) {
    console.error('Signup error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
