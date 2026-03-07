import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex bg-[#FDFCF8] dark:bg-[#0A0B1E] min-h-[calc(100vh-64px)]">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}