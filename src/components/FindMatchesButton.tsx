"use client";

import { useRouter } from "next/navigation";

type Props = {
  destination: string;
  departureDate: string;
};

export default function FindMatchesButton({
  destination,
  departureDate,
}: Props) {
  const router = useRouter();

  async function handleFindMatches() {
    try {
      const res = await fetch(
        `/api/matches?destination=${encodeURIComponent(
          destination
        )}&date=${departureDate}`
      );

      if (!res.ok) {
        alert("Failed to find matches");
        return;
      }

      const data = await res.json();

      alert(`Found ${data.matches.length} traveller(s)!`);

      // refresh navbar notification count
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleFindMatches}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Find Matches
    </button>
  );
}