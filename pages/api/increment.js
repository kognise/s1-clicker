import S1 from 's1db'

let current = null

export default async (_, res) => {
  // Wait for the previous request to finish so we don't get conflicts
  // https://www.youtube.com/watch?v=RY_2gElt3SA

  if (current) await current

  current = (async () => {
    const db = new S1(process.env.S1_TOKEN)
    const currentValue = await db.get('counter') ?? 0
    await db.set('counter', currentValue + 1)
  })()
  await current

  res.end()
}