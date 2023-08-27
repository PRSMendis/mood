import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'


export default async function Home() {
  const {userId} = await auth()

  let href = userId? '/jounral': '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className='w-full max-w-[600px]'>
        <h1 className='text-6xl'>mood</h1>
        <p>This is the best app for tracking your mood. All you have to do is be real.</p>
        <div>
          <Link href={href}>
            <button className='bg-blue-600 px-4 py-2 rounded-lg text-xl'>get started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
