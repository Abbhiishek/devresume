'use client';

import { AlertCircle, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useDomainStatus } from './use-domain-status';

export default function DomainStatus({ domain }: { domain: string }) {
  const { status, loading } = useDomainStatus({ domain });

  return loading ? (
    <Loader2 className="animate-spin w-4 h-4" />
  ) : status === 'Valid Configuration' ? (
    <CheckCircle2
      fill="#2563EB"
      stroke="currentColor"
      className="text-white dark:text-black"
    />
  ) : status === 'Pending Verification' ? (
    <AlertCircle
      fill="#FBBF24"
      stroke="currentColor"
      className="text-white dark:text-black"
    />
  ) : (
    <XCircle
      fill="#DC2626"
      stroke="currentColor"
      className="text-white dark:text-black"
    />
  );
}
