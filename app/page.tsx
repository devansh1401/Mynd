import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[800px] mx-auto p-8 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          <span className="text-6xl text-blue-500">Mynd</span> Know Yourself...
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Brain dump, wisdom out! Mynd&apos;s AI analyzes your journal,
          revealing hidden patterns for a deeper you. ✨
        </p>
        <div className="flex justify-center">
          <Link href={href}>
            <button className="bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold">
              Begin Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
