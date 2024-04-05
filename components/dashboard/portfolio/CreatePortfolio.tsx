'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { createSite } from '@/lib/actions';
import va from '@vercel/analytics';
import confetti from 'canvas-confetti';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const CreatePortfolioSchema = z.object({
  name: z
    .string({
      description: 'Name is required',
      invalid_type_error: 'Title is must be string',
    })
    .min(2, {
      message: 'Name must be at least 5 characters long',
    }),
  description: z
    .string({
      description: 'Description is required',
      required_error: 'Description is required',
      invalid_type_error: 'Description is must be string',
    })
    .optional(),
  subdomain: z
    .string({
      description: 'subdomain is required',
      required_error: 'subdomain is required',
      invalid_type_error: 'subdomain is must be string',
    })
    .max(20, {
      message: 'subdomain must be at most 20 characters long',
    }),
});

export default function CreatePortfolio() {
  const router = useRouter();
  const [formerror, setFormerror] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    subdomain: '',
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, '-'),
    }));
  }, [data.name]);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const result = CreatePortfolioSchema.safeParse({
      name: data.name,
      description: data.description,
      subdomain: data.subdomain,
    });

    if (!result.success) {
      setFormerror(result.error.errors[0].message);
      setLoading(false);
    } else {
      setFormerror('');
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('subdomain', data.subdomain);
      await createSite(formData).then((res: any) => {
        if (res.error) {
          toast.error('error Occured');
          setLoading(false);
        } else {
          confetti({
            angle: 60,
            spread: 155,
            origin: { x: 0 },
          });
          confetti({
            angle: 120,
            spread: 155,
            origin: { x: 1 },
          });
          va.track('Created Site');
          router.refresh();
          toast.success('Portfolio Craeted Successfully', {
            duration: 1000,
            onAutoClose: () => {
              router.push(`/dashboard/portfolio/${res.id}`);
            },
          });
          setLoading(false);
          setOpen(false);
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="text-xs ">
          <PlusCircleIcon className="w-6 h-6 " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="">Create Portfolio</span>
          </DialogTitle>
          <DialogDescription>
            <p className="inline text-red-500">{formerror}</p>
            <ScrollArea className="px-3 py-2 h-80">
              <div>
                <form onSubmit={handlesubmit}>
                  <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      placeholder="name"
                      value={data.name}
                      id="name"
                      required
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      placeholder="description"
                      value={data.description}
                      id="description"
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="subdomain">SubDomain</Label>
                    <div className="flex w-full max-w-md">
                      <Input
                        placeholder=""
                        type="text"
                        value={data.subdomain}
                        id="subdomain"
                        onChange={(e) =>
                          setData({ ...data, subdomain: e.target.value })
                        }
                      />
                      <div className="flex items-center rounded-r-lg border border-l-0 border-stone-200 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                        .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <div className="flex flex-row items-center justify-center gap-5">
              <Button
                type="submit"
                className="w-full"
                onClick={handlesubmit}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  'Create Protfolio'
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
