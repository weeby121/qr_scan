 "use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import type { CardData } from "@/app/page";

interface DigitalCardProps {
  data: Partial<CardData>;
}

function ContactDetail({ icon: Icon, detail, href }: { icon: React.ElementType, detail: string | undefined, href?: string }) {
  if (!detail) return null;
  const link = href || '#';
  const isExternalLink = link.startsWith('http') || link.startsWith('mailto') || link.startsWith('tel');

  return (
    <a 
      href={isExternalLink ? link : undefined}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary group"
      onClick={(e) => !isExternalLink && e.preventDefault()}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-4 w-4 text-secondary-foreground transition-colors group-hover:text-primary-foreground" />
      </div>
      <span className="truncate">{detail}</span>
    </a>
  );
}

export default function DigitalCard({ data }: DigitalCardProps) {
  const initials = data.name ? data.name.split(' ').map(n => n[0]).join('') : "JD";

  return (
    <Card className="w-full max-w-sm shadow-2xl rounded-2xl overflow-hidden bg-card">
        <div className="bg-primary/10 p-6 relative h-28">
          {data.logo && (
            <Image 
              src={data.logo} 
              alt="Company Logo" 
              width={80} 
              height={80} 
              className="absolute top-4 right-4 object-contain"
              data-ai-hint="company logo"
            />
          )}
        </div>
        <div className="relative flex flex-col items-center p-6 pt-0 -mt-16">
            <Avatar className="h-28 w-28 border-4 border-card shadow-lg" data-ai-hint="person avatar">
                <AvatarImage src={data.avatar} alt={data.name || "User Avatar"} />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-center mt-4">
                <h2 className="text-2xl font-bold font-headline">{data.name || "Jane Doe"}</h2>
                <p className="text-primary font-medium">{data.designation || "Designation"}</p>
            </div>
        </div>

      <CardContent className="p-6 grid gap-4">
        <ContactDetail icon={Phone} detail={data.phone} href={`tel:${data.phone}`} />
        <ContactDetail icon={Mail} detail={data.email} href={`mailto:${data.email}`} />
        <ContactDetail icon={Globe} detail={data.website} href={data.website} />
        <ContactDetail icon={MapPin} detail={data.address} />
      </CardContent>
    </Card>
  );
}
