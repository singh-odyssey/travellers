"use client"

export default function ProfileCard() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 shadow-xl">

            <h1 className="text-2xl font-semibold text-white mb-8">Edit Profile</h1>

            <div className="grid grid-cols-3 gap-10">

                {/* Profile Image */}
                <div className="flex justify-center items-start">
                    <div className="w-64 h-64 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-700 transition">
                        Upload Photo
                    </div>
                </div>

                {/* Form Section */}
                <div className="col-span-2 space-y-6">

                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <textarea
                        placeholder="Write your bio text here..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Location"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Other Location"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-white">
                            Upload Ticket
                        </button>
                        <span className="text-slate-400 text-sm">
                            Status: Ticket Verification
                        </span>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium transition">
                            Save Changes
                        </button>
                        <button className="bg-slate-200 text-black px-6 py-2 rounded-lg">
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}