 "use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CardData } from "@/app/page";

export default function QRCodeDisplay() {
  const { watch, formState: { isValid } } = useFormContext<CardData>();
  const cardData = watch();
  const { toast } = useToast();

  const [shareableLink, setShareableLink] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isValid && isClient) {
      const filteredData = Object.fromEntries(
        Object.entries(cardData).filter(([, value]) => value)
      );
      
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(filteredData)) {
        if (typeof value === 'string') {
          params.set(key, value);
        }
      }

      const link = `${window.location.origin}/card?${params.toString()}`;
      setShareableLink(link);
      setQrCodeUrl(`https://quickchart.io/qr?text=${encodeURIComponent(link)}&size=200`);
    } else {
        setShareableLink("");
        setQrCodeUrl("");
    }
  }, [cardData, isValid, isClient]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share your digital card link.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Share Your Card</CardTitle>
        <CardDescription>Your QR code and link will update automatically.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex justify-center p-4 bg-muted/50 rounded-lg">
          {qrCodeUrl ? (
            <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} className="rounded-md" />
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-md">
              <p className="text-muted-foreground text-center text-sm p-4">Complete the form to generate a QR code.</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
            <div className="relative">
                <Input value={shareableLink} readOnly className="pr-12" placeholder="Your shareable link appears here"/>
                <Button variant="ghost" size="icon" className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7" onClick={handleCopy} disabled={!isValid}>
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <a href={qrCodeUrl} download="cardify-qrcode.png" className={!isValid ? 'pointer-events-none' : ''}>
                <Button className="w-full" disabled={!isValid}>
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                </Button>
            </a>
        </div>
      </CardContent>
    </Card>
  )
}
