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

  const result = await analyse(`I'm going to give you a journal entry, I want you to analyse for a few thigns. I need the mood,
   a summary, what the subject is, and a colour representing the mood. You need to respond back with Formatted JSON like so:
   {"mood": "", "subject": "", "summary": "", "colour": "", negative": ""}
   
   entry: 
   Today was a really bad day. I was feeling really sad and I had a lot of work to do. I was feeling really stressed out and I
   didn't know what to do. I was feeling really sad and I had a lot of work to do.`)

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