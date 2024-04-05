import AlertCard from '@/components/dashboard/AlertCard';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const User = await currentUser();
  if (!User) {
    redirect('/sign-in');
  }
  return (
    <main className="flex flex-col justify-center items-center">
      <AlertCard user={User!} />
    </main>
  );
}
