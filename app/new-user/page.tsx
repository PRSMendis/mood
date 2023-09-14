import {prisma} from "@/utils/db" 
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// the purpose of createNewYser is to create a new user in the database
// if the user doesn't exist
// it's imperative that the clerkId is attached to the user
// so that we can use it to query the database
// and we're not reliant on the clerk service
// the alternative would be to use a webhook from clerk, 
// but that would cause the user to be locked out until a response was receive from the webhook

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