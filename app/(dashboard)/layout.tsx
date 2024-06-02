import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4 text-center">
          <Link
            href="/"
            className="text-3xl font-bold text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-150 ease-in-out"
          >
            Mynd
          </Link>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout

// import { UserButton } from '@clerk/nextjs'
// import Link from 'next/link'

// const links = [
//   { name: 'Journals', href: '/journal' },
//   { name: 'History', href: '/history' },
// ]

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="w-screen h-screen relative bg-white">
//       <aside className="fixed left-8 top-8 h-[calc(100vh-4rem)] w-[250px] rounded-3xl bg-white shadow-lg shadow-gray-300/50">
//         <div className="px-4 my-4 text-center">
//           <Link href="/" className="relative">
//             <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
//               Mynd
//             </span>
//           </Link>
//         </div>
//         <div className="mt-8 text-center">
//           <h3 className="px-4 ml-4 text-lg font-semibold text-gray-600">
//             Navigation
//           </h3>
//           <ul className="px-4 mt-2">
//             {links.map((link) => (
//               <li key={link.name} className="my-2 flex items-center">
//                 <Link
//                   href={link.href}
//                   className="flex items-center justify-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-150 ease-in-out"
//                 >
//                   {link.name === 'Journals' && (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h8a1 1 0 100-2H7zm-1 4a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h8a1 1 0 100-2H7z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                   {link.name === 'History' && (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 mr-2"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                   <span>{link.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="absolute bottom-4 left-0 w-full text-center">
//           <p className="text-sm font-medium text-gray-500">Powered by Mynd</p>
//         </div>
//       </aside>
//       <div className="ml-[calc(250px+2rem)] h-full w-[calc(100vw-calc(250px+4rem))]">
//         <header className="h-[60px] rounded-2xl bg-white shadow-lg shadow-gray-300/50 px-6 flex items-center justify-between my-8 mx-4">
//           <div className="text-xl font-semibold">Write • Reflect • Evolve</div>
//           <nav>
//             <div className="flex items-center">
//               <UserButton afterSignOutUrl="/" />
//             </div>
//           </nav>
//         </header>
//         <div className="h-[calc(100vh-8rem-60px)]">{children}</div>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout
