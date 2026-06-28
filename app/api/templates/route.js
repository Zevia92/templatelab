import templates from '@/lib/templates.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')?.toLowerCase()

  let result = templates

  if (category && category !== 'Tout') {
    result = result.filter((t) => t.category === category)
  }

  if (q) {
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    )
  }

  return Response.json({ templates: result, total: result.length })
}
