import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import { analyse } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import {prisma} from '@/utils/db'
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkID();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const result = await analyse(` Today was a really great day, I got some awesome new shoes, and I went to the park with my friends. I'm really happy!`)

  return entries;
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className='bg-zinc-400/10 h-full'>
      <h2 className='text-3xl mb-8'>Journal</h2>
      <div className='grid grid-cols-3 gap-4'>
        <NewEntryCard/>
          {entries.map((entry) => (
            <Link href={`/journal/${entry.id}`}>
              <EntryCard key={entry.id} entry={entry}/>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default JournalPage;