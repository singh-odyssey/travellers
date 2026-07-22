"use client";

import { useState } from "react";
import { Shield, MapPin, CheckCircle, ArrowRight, ShieldAlert, User, Compass, Instagram, Twitter } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [budget, setBudget] = useState("Mid-range");
  const [agreedToSafety, setAgreedToSafety] = useState(false);

  // New onboarding form states
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [travelStyle, setTravelStyle] = useState("Backpacker");

  if (!isOpen) return null;

  const languagesList = ["English", "Spanish", "French", "German", "Mandarin", "Hindi", "Arabic", "Portuguese", "Japanese"];
  const interestsList = ["Adventure", "Food", "Culture", "Sightseeing", "Nature", "Hiking", "Photography", "History", "Nightlife"];
  const accommodationsList = ["Hostels", "Budget Hotels", "Airbnb", "Couchsurfing", "Campsites", "Luxury Resorts"];

  const toggleItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  async function handleFinish() {
    if (!agreedToSafety) {
      alert("Please agree to our safety guidelines before proceeding.");
      return;
    }

    setLoading(true);

    const socialLinks = [];
    if (instagram) socialLinks.push(`https://instagram.com/${instagram.replace("@", "").trim()}`);
    if (twitter) socialLinks.push(`https://x.com/${twitter.replace("@", "").trim()}`);

    try {
      const res = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          bio: bio || undefined,
          location: location || undefined,
          homeLocation: homeLocation || undefined,
          languages: selectedLanguages,
          travelInterests: selectedInterests,
          accommodationPrefs: selectedAccommodations,
          budgetRange: budget,
          socialLinks,
          age: age ? parseInt(age, 10) : undefined,
          gender: gender || undefined,
          travelStyle: travelStyle || undefined,
        }),
      });
      if (res.ok) {
        onComplete();
      } else {
        console.error("Failed to update onboarding status");
      }
    } catch (err) {
      console.error("Error completing onboarding:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg my-8 rounded-3xl bg-white dark:bg-[#0F1129] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Indicator */}
        <div className="flex h-1.5 w-full bg-gray-100 dark:bg-gray-800">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-full transition-all duration-300 ${
                s <= step ? "bg-emerald-500" : "bg-transparent"
              }`}
              style={{ width: "33.33%" }}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh]">
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl p-3 shrink-0 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30">
                  <User size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Step 1 of 3
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                    Identity & Details
                  </h3>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Introduce yourself to other verified solo travelers. Help build trust by filling out your basic profile info.
              </p>

              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 25"
                      min={18}
                      max={99}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-700 dark:text-slate-250"
                    >
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1">Home Location</label>
                    <input
                      type="text"
                      value={homeLocation}
                      onChange={(e) => setHomeLocation(e.target.value)}
                      placeholder="e.g. London, UK"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1">Current Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Paris, France"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell other travelers about your travel style, hobbies, or what you are looking for..."
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1 flex items-center gap-1">
                      <Instagram size={12} /> Instagram
                    </label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@username"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-450 ml-1 flex items-center gap-1">
                      <Twitter size={12} /> Twitter / X
                    </label>
                    <input
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="@username"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl p-3 shrink-0 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30">
                  <Compass size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Step 2 of 3
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                    Travel Preferences
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {/* Languages */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">Languages Spoken</label>
                  <div className="flex flex-wrap gap-1.5">
                    {languagesList.map((lang) => {
                      const active = selectedLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition duration-150 ${
                            active
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Travel Interests */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">Travel Interests</label>
                  <div className="flex flex-wrap gap-1.5">
                    {interestsList.map((interest) => {
                      const active = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleItem(selectedInterests, setSelectedInterests, interest)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition duration-150 ${
                            active
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accommodation */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">Accommodation Style</label>
                  <div className="flex flex-wrap gap-1.5">
                    {accommodationsList.map((acc) => {
                      const active = selectedAccommodations.includes(acc);
                      return (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => toggleItem(selectedAccommodations, setSelectedAccommodations, acc)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition duration-150 ${
                            active
                              ? "bg-[#6366F1] text-white shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {acc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">Budget Range</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-700 dark:text-slate-200"
                  >
                    <option value="Economy">Economy (Budget hostels, public transport)</option>
                    <option value="Mid-range">Mid-range (Local Airbnbs, shared cabs)</option>
                    <option value="Luxury">Luxury (Resorts, private taxis)</option>
                  </select>
                </div>

                {/* Travel Style */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">Travel Style</label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-slate-50/50 dark:bg-[#151737] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-700 dark:text-slate-200"
                  >
                    <option value="Backpacker">Backpacker (Adventurous, social, hostels)</option>
                    <option value="Slow Travel">Slow Travel (Exploring deeply, relaxed pace)</option>
                    <option value="Luxury">Luxury (Comfort, resorts, fine dining)</option>
                    <option value="Adventure">Adventure (Hiking, sports, outdoors)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl p-3 shrink-0 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30">
                  <Shield size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Step 3 of 3
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                    Safety & Privacy
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mt-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                <div className="flex gap-2.5 items-start">
                  <ShieldCheckIcon className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-xs">Date-Matching Privacy</h4>
                    <p className="text-[11px] mt-0.5 text-slate-500">Your trip is only visible to travelers matching the same destination within a strict ±3-day window.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <ShieldAlert size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-xs">Meeting Safety</h4>
                    <p className="text-[11px] mt-0.5 text-slate-500">Always coordinate meetups in public places and let family or friends know your itinerary details.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-250 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 mt-4">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToSafety}
                      onChange={(e) => setAgreedToSafety(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-normal">
                      I agree to prioritize traveler safety, verify matches responsibly, and respect community standards.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="text-xs text-gray-400">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="hover:text-gray-600 dark:hover:text-gray-200 transition font-medium"
                >
                  Back
                </button>
              )}
            </div>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 px-5 py-2.5 text-sm font-semibold transition"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={loading || !agreedToSafety}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Start Exploring"} <CheckCircle size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      width={size}
      height={size}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}
