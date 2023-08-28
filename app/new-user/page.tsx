import {prisma} from "@/utils/db" 
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async() => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string
    }
  })

  if (!match) { // if the user doesn't exist
    console.log('MATCH: ', match);
    
    await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user.emailAddresses[0]?.emailAddress as string,
      }
    })
  }

  redirect('/journal')
}

const newUserPage = async () => {
  await createNewUser()
  return (
    <div>
      ...loading
    </div>
  );
}

export default newUserPage;