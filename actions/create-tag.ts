import { db } from '@/db'
import { tags } from '@/db/schema'

export async function createTag(tagName: string) {
  const newTag = await db.insert(tags).values({ name: tagName }).returning()
  return newTag[0]
}