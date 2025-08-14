 "use client";

import { useFormContext } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Briefcase, Phone, Mail, Globe, MapPin, Image as ImageIcon, Building } from "lucide-react";
import type { CardData } from "@/app/page";
import Image from "next/image";

function InputField({ name, label, placeholder, icon: Icon }: { name: keyof CardData; label: string; placeholder: string; icon: React.ElementType }) {
  const { control } = useFormContext<CardData>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <FormControl>
              <Input placeholder={placeholder} {...field} className="pl-10" />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ImageUploadField({ name, label, icon: Icon }: { name: "avatar" | "logo", label: string, icon: React.ElementType }) {
    const { control, watch, setValue } = useFormContext<CardData>();
    const imageUrl = watch(name);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue(name, reader.result as string, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-full border border-dashed flex items-center justify-center bg-muted/50 overflow-hidden">
                        {imageUrl ? (
                            <Image src={imageUrl} alt={label} layout="fill" objectFit="cover" />
                        ) : (
                            <Icon className="h-8 w-8 text-muted-foreground" />
                        )}
                        </div>
                        <FormControl>
                            <Input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange} 
                                className="hidden" 
                                id={`file-upload-${name}`}
                            />
                        </FormControl>
                         <label htmlFor={`file-upload-${name}`} className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                           Upload Image
                        </label>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default function CardifyForm() {
  const form = useFormContext<CardData>();

  return (
    <form className="space-y-6">
        <InputField name="name" label="Full Name" placeholder="e.g. Jane Doe" icon={User} />
        <InputField name="designation" label="Designation" placeholder="e.g. Product Manager" icon={Briefcase} />
        <ImageUploadField name="avatar" label="Your Photo" icon={ImageIcon} />
        <ImageUploadField name="logo" label="Company Logo" icon={Building} />
        <InputField name="phone" label="Phone Number" placeholder="e.g. +1 (555) 123-4567" icon={Phone} />
        <InputField name="email" label="Email Address" placeholder="e.g. jane.doe@example.com" icon={Mail} />
        <InputField name="website" label="Website" placeholder="e.g. https://example.com" icon={Globe} />
        <InputField name="address" label="Address" placeholder="e.g. 123 Main St, Anytown, USA" icon={MapPin} />
    </form>
  )
}
