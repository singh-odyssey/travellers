"use client";

import { useState } from "react";

export default function TripBudgetEstimator() {
    const [destination, setDestination] = useState("");
    const [travelers, setTravelers] = useState(1);
    const [duration, setDuration] = useState(1);
    const [accommodation, setAccommodation] = useState(0);
    const [food, setFood] = useState(0);
    const [transport, setTransport] = useState(0);
    const [misc, setMisc] = useState(0);

    const accommodationTotal = accommodation * duration;
    const foodTotal = food * duration;
    const transportTotal = transport;
    const miscTotal = misc;

    const totalBudget =
        accommodationTotal +
        foodTotal +
        transportTotal +
        miscTotal;

    const costPerTraveler =
        travelers > 0 ? totalBudget / travelers : 0;

    return (
        <div className="max-w-5xl mx-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-2">
                Trip Budget Estimator
            </h2>

            <p className="text-slate-400 mb-8">
                Estimate your total trip cost and view an expense breakdown.
            </p>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Destination
                    </label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                        placeholder="e.g. Paris"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Number of Travelers
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={travelers}
                        onChange={(e) => setTravelers(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Trip Duration (Days)
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={duration}
                        onChange={(e) => setDuration(Math.max(1, Number(e.target.value) || 1))} 
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Accommodation Cost / Night
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={accommodation}
                        onChange={(e) => setAccommodation(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Daily Food Budget
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={food}
                        onChange={(e) => setFood(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Local Transport Budget
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={transport}
                        onChange={(e) => setTransport(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-white">
                        Miscellaneous Expenses
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={misc}
                        onChange={(e) => setMisc(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
                    />
                </div>
            </div>
            <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800 p-6">
                <h3 className="text-2xl font-semibold text-white mb-6">
                    Budget Summary
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                    <div className="rounded-lg bg-slate-900 p-4">
                        <p className="text-slate-400 text-sm">Total Estimated Budget</p>
                        <p className="text-3xl font-bold text-green-400">
                            ${totalBudget.toFixed(2)}
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-900 p-4">
                        <p className="text-slate-400 text-sm">Cost Per Traveler</p>
                        <p className="text-3xl font-bold text-blue-400">
                            ${costPerTraveler.toFixed(2)}
                        </p>
                    </div>

                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">
                        Expense Breakdown
                    </h4>

                    <div className="space-y-3">

                        <div className="flex justify-between text-slate-300">
                            <span>Accommodation</span>
                            <span>${accommodationTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-slate-300">
                            <span>Food</span>
                            <span>${foodTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-slate-300">
                            <span>Local Transport</span>
                            <span>${transportTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-slate-300">
                            <span>Miscellaneous</span>
                            <span>${miscTotal.toFixed(2)}</span>
                        </div>

                        <hr className="border-slate-600" />

                        <div className="flex justify-between text-xl font-bold text-white">
                            <span>Total</span>
                            <span>${totalBudget.toFixed(2)}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}