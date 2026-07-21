"use client";

import { useState } from "react";
import OnboardingModal from "./OnboardingModal";

interface DashboardClientProps {
  initialOnboarded: boolean;
}

export default function DashboardClient({ initialOnboarded }: DashboardClientProps) {
  const [onboarded, setOnboarded] = useState(initialOnboarded);

  return (
    <OnboardingModal
      isOpen={!onboarded}
      onComplete={() => setOnboarded(true)}
    />
  );
}
