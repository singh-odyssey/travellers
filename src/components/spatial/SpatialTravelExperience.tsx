"use client";

import { Gauge, Globe2, MousePointer2, Route } from "lucide-react";
import { useState } from "react";

import SafeInteractiveGlobe from "./SafeInteractiveGlobe";
import ScrollFlightPath from "./ScrollFlightPath";
import TiltCard from "./TiltCard";
import {
  DEFAULT_REGION_ID,
  TRAVEL_REGIONS,
  getTravelRegion,
  type TravelRegionId,
} from "./spatial-data";

export default function SpatialTravelExperience() {
  const [selectedRegionId, setSelectedRegionId] =
    useState<TravelRegionId>(DEFAULT_REGION_ID);

  const selectedRegion = getTravelRegion(selectedRegionId);

  return (
    <section
      id="spatial-exploration"
      className="mx-auto mt-28 max-w-7xl px-6"
      aria-labelledby="spatial-exploration-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-[#0B4B74] dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300">
          <Globe2 className="h-4 w-4" />
          Lightweight spatial exploration
        </div>

        <h2
          id="spatial-exploration-title"
          className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Explore travel communities around the world
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Rotate the globe, choose a region, and preview matching travel
          communities without loading large 3D model files.
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <SafeInteractiveGlobe
          selectedRegionId={selectedRegionId}
          onSelectRegion={setSelectedRegionId}
        />

        <div className="flex flex-col rounded-3xl border border-[#E7D5BF] bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C67A3D]">
            Selected region
          </p>

          <h3 className="mt-3 text-3xl font-semibold">
            {selectedRegion.name}
          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {selectedRegion.description}
          </p>

          <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <dt className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Gauge className="h-4 w-4" />
                Prototype communities
              </dt>
              <dd className="mt-2 text-2xl font-semibold">
                {selectedRegion.communityCount}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <dt className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Route className="h-4 w-4" />
                Featured route
              </dt>
              <dd className="mt-2 font-semibold">
                {selectedRegion.featuredRoute}
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Choose a region
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {TRAVEL_REGIONS.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegionId(region.id)}
                  aria-pressed={region.id === selectedRegionId}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#0B4B74] focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    region.id === selectedRegionId
                      ? "border-[#0B4B74] bg-[#0B4B74] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#0B4B74] hover:text-[#0B4B74] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className="mt-auto flex items-start gap-3 border-t border-slate-100 pt-7 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400"
            role="note"
          >
            <MousePointer2 className="mt-0.5 h-4 w-4 shrink-0" />
            The counts in this prototype are display data only and can later
            be connected to the project API.
          </div>
        </div>
      </div>

      <ScrollFlightPath />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {TRAVEL_REGIONS.slice(0, 3).map((region) => (
          <TiltCard
            key={region.id}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={() => setSelectedRegionId(region.id)}
              className="w-full rounded-2xl p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#0B4B74] focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 font-semibold text-[#0B4B74] dark:bg-sky-950 dark:text-sky-300">
                  {region.name.slice(0, 2).toUpperCase()}
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                  {region.travelWindow}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {region.name} travel buddies
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {region.featuredRoute}
              </p>
              <p className="mt-4 text-sm font-medium text-[#0B4B74] dark:text-sky-300">
                Preview region →
              </p>
            </button>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
