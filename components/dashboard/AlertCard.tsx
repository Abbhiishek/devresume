import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { User } from '@clerk/nextjs/server';
import { AlertCircle } from 'lucide-react';

function AlertCard({ user }: { user: User }) {
  return (
    <main className="flex justify-center items-center w-full rounded-2xl">
      <div className="w-full flex justify-center ">
        <Alert className="rounded-full">
          <AlertCircle className="w-5 h-5" />
          <AlertTitle>You are in 🚀 {user?.username}</AlertTitle>
          <AlertDescription>Thanks for joining waitlist!!</AlertDescription>
        </Alert>
      </div>
    </main>
  );
}

export default AlertCard;
