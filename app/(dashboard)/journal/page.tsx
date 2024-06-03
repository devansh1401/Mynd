import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { analysis } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })
  await analysis(
    `so today i woke up at 8 in morning and had amazing breakfest, but my mom's health wasn't that well...`
  )
  // console.log(data)
  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  // console.log(data)
  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h1 className="text-3xl mb-8">Journal</h1>
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {data.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default JournalPage
