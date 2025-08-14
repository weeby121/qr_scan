"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DigitalCard from "@/components/DigitalCard";
import type { CardData } from '@/app/page';

function CardView() {
    const searchParams = useSearchParams();
    
    const cardData: CardData = {
        name: searchParams.get('name') || '',
        designation: searchParams.get('designation') || '',
        phone: searchParams.get('phone') || '',
        email: searchParams.get('email') || '',
        website: searchParams.get('website') || '',
        address: searchParams.get('address') || '',
        avatar: searchParams.get('avatar') || '',
        logo: searchParams.get('logo') || '',
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-dvh bg-muted/50 dark:bg-muted/20 p-4 sm:p-6 md:p-8">
            <DigitalCard data={cardData} />
            <footer className="mt-8 text-center text-sm text-muted-foreground">
                <p>Generated with Cardify</p>
            </footer>
        </div>
    )
}

export default function ShareableCardPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Card...</div>}>
            <CardView />
        </Suspense>
    )
}
