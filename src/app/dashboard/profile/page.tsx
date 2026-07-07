"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Upload, KeyRound } from "lucide-react";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [homeLocation, setHomeLocation] = useState("");
    const [preview, setPreview] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    setName(data.name ?? "");
                    setEmail(data.email ?? "");
                    setBio(data.bio ?? "");
                    setLocation(data.location ?? "");
                    setHomeLocation(data.homeLocation ?? "");
                    setPreview(data.image ?? "");
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
            }
        }
        fetchProfile();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];
        setAvatarFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, bio, location, homeLocation }),
            });
            if (avatarFile) {
                const formData = new FormData();
                formData.append("file", avatarFile);
                await fetch("/api/user/avatar", { method: "POST", body: formData });
            }
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
        setLoading(false);
    };

    const handlePasswordSubmit = async () => {
        setPasswordError(null);
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("All password fields are required.");
            return;
        }
        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirm password do not match.");
            return;
        }

        setPasswordLoading(true);
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();
            if (res.ok) {
                setShowSuccessModal(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setPasswordError(data.error || "Failed to update password.");
            }
        } catch (error) {
            console.error(error);
            setPasswordError("Something went wrong. Please try again.");
        }
        setPasswordLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Edit Profile</h1>

            <div className="rounded-[32px] border border-gray-100 dark:border-gray-800 bg-[#F6F4EC] dark:bg-[#11132B] p-8 md:p-12 shadow-sm transition-colors duration-300">
                <div className="grid md:grid-cols-[280px_1fr] gap-12 lg:gap-16">

                    {/* Left: Avatar Section */}
                    <div className="flex flex-col items-center gap-6">
                        <label className="group relative w-64 h-64 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer bg-white dark:bg-[#1A1C3D] hover:border-emerald-500 dark:hover:border-blue-500 transition-all overflow-hidden shadow-inner">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Avatar"
                                    fill
                                    className="object-cover group-hover:opacity-75 transition-opacity"
                                    unoptimized
                                />
                            ) : (
                                <div className="text-gray-400 text-center space-y-2">
                                    <Camera size={32} className="mx-auto" />
                                    <p className="text-sm font-medium">Upload Photo</p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {/* Right: Form Section */}
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Full Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Email Address</label>
                                <input
                                    value={email}
                                    disabled
                                    placeholder="yourname@gmail.com"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-gray-50 dark:bg-[#07081A] text-gray-500 text-sm italic"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write your bio text here here..."
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none resize-none"
                                rows={3}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Location</label>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Location</label>
                                <input
                                    value={homeLocation}
                                    onChange={(e) => setHomeLocation(e.target.value)}
                                    placeholder="Home Location"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Ticket Verification</label>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button className="flex items-center gap-2 bg-[#1A4D2E] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#143B23] transition-colors shadow-sm w-full sm:w-auto">
                                    <Upload size={16} />
                                    Upload
                                </button>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Ticket Verification Status: <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified</span></span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-10">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-[#1A4D2E] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-sm disabled:opacity-60"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-8 rounded-[32px] border border-gray-100 dark:border-gray-800 bg-[#F6F4EC] dark:bg-[#11132B] p-8 md:p-12 shadow-sm transition-colors duration-300">
                <div className="grid md:grid-cols-[280px_1fr] gap-12 lg:gap-16">
                    {/* Left: Security Info */}
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 gap-4">
                        <div className="p-4 rounded-full bg-white dark:bg-[#1A1C3D] border border-gray-100 dark:border-gray-800 shadow-inner">
                            <KeyRound size={40} className="text-gray-400 dark:text-gray-300" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security</h2>
                            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400 max-w-[200px]">Update your password to keep your account secure.</p>
                        </div>
                    </div>

                    {/* Right: Password Change Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0F1129] focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none"
                                />
                            </div>
                        </div>

                        {passwordError && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                ⚠️ {passwordError}
                            </div>
                        )}

                        <div className="flex pt-4">
                            <button
                                onClick={handlePasswordSubmit}
                                disabled={passwordLoading}
                                className="bg-[#1A4D2E] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-sm disabled:opacity-60 w-full sm:w-auto"
                            >
                                {passwordLoading ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#11132B] border border-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Password Changed!</h3>
                        <p className="text-gray-400 text-sm mb-6">Your password has been updated successfully. You can now use your new password next time you sign in.</p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-[#1A4D2E] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-sm"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}