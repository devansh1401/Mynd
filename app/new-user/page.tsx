// import { prisma } from '@/utils/db'
// import { auth, currentUser } from '@clerk/nextjs/server'

// const createNewUser = async () => {
//   const user = await currentUser()
//   const match = await prisma.user.findUnique({
//     where: {
//       clerkId: user.id as string,
//     },
//   })

//   if (!match) {
//     const NewUser = await prisma.user.create({
//       data: {
//         clerkId: user.id,
//       },
//     })
//   }
// }
// const NewUserPage = () => {
//   return (
//     <div>
//       <h1>New User</h1>
//     </div>
//   )
// }

// export default NewUserPage
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  //  console.log(user)

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
