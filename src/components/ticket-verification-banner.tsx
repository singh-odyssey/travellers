"use client";

import { useEffect, useState } from "react";
import { getCurrentSeason } from "@/lib/season";

export default function TicketVerificationBanner() {
  const [season, setSeason] = useState<string>("upcoming");

  useEffect(() => {
    setSeason(getCurrentSeason());
  }, []);

  return <>Now verifying tickets for {season} trips</>;
}