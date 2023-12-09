"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Input, Textarea } from "@nextui-org/react";
import va from "@vercel/analytics";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import DomainConfiguration from "./domain-configuration";
import DomainStatus from "./domain-status";
import Uploader from "./uploader";

export default function Form({
    title,
    description,
    helpText,
    inputAttrs,
    handleSubmit,
}: {
    title: string;
    description: string;
    helpText: string;
    inputAttrs: {
        name: string;
        type: string;
        defaultValue: string;
        placeholder?: string;
        maxLength?: number;
        pattern?: string;
    };
    handleSubmit: any;
}) {
    const { id } = useParams() as { id?: string };
    const router = useRouter();
    const { toast } = useToast()
    return (
        <form
            action={async (data: FormData) => {
                if (
                    inputAttrs.name === "customDomain" &&
                    inputAttrs.defaultValue &&
                    data.get("customDomain") !== inputAttrs.defaultValue &&
                    !confirm("Are you sure you want to change your custom domain?")
                ) {
                    return;
                }
                handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
                    if (res.error) {
                        // toast.error(res.error);
                        console.log(res.error)
                        toast({
                            title: "An error occurred.",
                            description: res.error,
                            variant: "destructive",
                        });
                    } else {
                        va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
                        if (id) {
                            router.refresh();
                        } else {
                            router.refresh();
                        }
                        toast({
                            title: "🌱",
                            description: `Successfully updated ${inputAttrs.name}!`,
                        });
                    }
                });
            }}
            className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
        >
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
                <h2 className="font-cal text-xl dark:text-white">{title}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    {description}
                </p>
                {inputAttrs.name === "image" || inputAttrs.name === "avatar" ? (
                    <Uploader
                        defaultValue={inputAttrs.defaultValue}
                        name={inputAttrs.name}
                    />
                ) : inputAttrs.name === "font" ? (
                    <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-stone-600">
                        <select
                            name="font"
                            defaultValue={inputAttrs.defaultValue}
                            className="w-full rounded-none border-none bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white"
                        >
                            <option value="font-cal">Cal Sans</option>
                            <option value="font-lora">Lora</option>
                            <option value="font-work">Work Sans</option>
                        </select>
                    </div>
                ) : inputAttrs.name === "subdomain" ? (
                    <div className="flex w-full max-w-md">
                        <input
                            {...inputAttrs}
                            required
                            className="z-10 flex-1 rounded-l-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                        />
                        <div className="flex items-center rounded-r-md border border-l-0 border-stone-300 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                            {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                        </div>
                    </div>
                ) : inputAttrs.name === "customDomain" ? (
                    <div className="relative flex w-full max-w-md">
                        <input
                            {...inputAttrs}
                            className="z-10 flex-1 rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                        />
                        {inputAttrs.defaultValue && (
                            <div className="absolute right-3 z-10 flex h-full items-center">
                                <DomainStatus domain={inputAttrs.defaultValue} />
                            </div>
                        )}
                    </div>
                ) : inputAttrs.type === "description" ? (
                    <Textarea
                        {...inputAttrs}
                        required
                        disableAnimation
                        disableAutosize
                        variant="bordered"
                        classNames={{
                            base: "max-w-wull",
                            input: "resize-y min-h-[40px]",
                        }}
                    />
                ) : (
                    <Input
                        {...inputAttrs}
                        required
                        className="w-full max-w-md rounded-md "
                    />
                )}
            </div>
            {inputAttrs.name === "customDomain" && inputAttrs.defaultValue && (
                <DomainConfiguration domain={inputAttrs.defaultValue} />
            )}
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                <p className="text-sm text-stone-500 dark:text-stone-400">{helpText}</p>
                <FormButton />
            </div>
        </form>
    );
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className={cn(
                "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
                pending
                    ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
            disabled={pending}
        >
            {pending ? <Loader2 className="animate-spin w-4 h-4" /> : <p>Save Changes</p>}
        </button>
    );
}
