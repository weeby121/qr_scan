"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import CardifyForm from "@/components/CardifyForm";
import CardPreview from "@/components/CardPreview";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { MountainIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  designation: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  website: z.string().url("Invalid URL.").optional().or(z.literal('')),
  address: z.string().optional(),
  avatar: z.string().url("Invalid URL").optional().or(z.literal('')),
  logo: z.string().url("Invalid URL").optional().or(z.literal('')),
});

export type CardData = z.infer<typeof formSchema>;

export default function Home() {
  const methods = useForm<CardData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      designation: "",
      phone: "",
      email: "",
      website: "",
      address: "",
      avatar: "",
      logo: "",
    },
    mode: "onChange"
  });

  return (
    <Form {...methods}>
      <div className="flex flex-col min-h-dvh bg-background">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <a className="flex items-center justify-center" href="#">
            <MountainIcon className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold font-headline">Cardify</span>
          </a>
        </header>
        <main className="flex-1 w-full">
          <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20 py-12">
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Create Your Digital Card</h1>
                <p className="text-muted-foreground">Fill in your details to see a live preview of your digital visiting card.</p>
              </div>
              <CardifyForm />
            </div>
            <div className="flex flex-col items-center justify-start gap-8 pt-0 lg:pt-16">
              <div className="sticky top-24 w-full max-w-sm space-y-8">
                <CardPreview />
                <QRCodeDisplay />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Form>
  );
}
