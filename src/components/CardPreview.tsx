 "use client";

import { useFormContext } from "react-hook-form";
import type { CardData } from "@/app/page";
import DigitalCard from "@/components/DigitalCard";

export default function CardPreview() {
  const { watch } = useFormContext<CardData>();
  const cardData = watch();

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-4 font-headline">Live Preview</h2>
      <DigitalCard data={cardData} />
    </div>
  );
}
