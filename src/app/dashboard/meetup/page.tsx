"use client";

import { useEffect, useState } from "react";
import TripBoard from "@/components/TripBoard";

interface MeetupPlan {
  id: string;
  title: string;
  locationName: string;
  meetupTime: string;
  notes?: string;
  routeId?: string;
}

export default function MeetupPage() {
  const [plan, setPlan] = useState<MeetupPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlan() {
      try {
        const res = await fetch("/api/meetup-plans");

        if (!res.ok) return;

        const plans = await res.json();

        if (plans.length > 0) {
          setPlan(plans[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex justify-center items-center h-screen">
        No meetup plan found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <TripBoard
        meetupPlanId={plan.id}
        title={plan.title}
        location={plan.locationName}
        meetupTime={plan.meetupTime}
        notes={plan.notes}
        routeId={plan.routeId}
      />
    </div>
  );
}