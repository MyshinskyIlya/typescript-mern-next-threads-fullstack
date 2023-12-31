import "../globals.css";
import { Inter } from "next/font/google";
import TopBar from "../../components/shared/TopBar";
import LeftSideBar from "../../components/shared/LeftSideBar";
import RightSideBar from "../../components/shared/RightSideBar";
import BottomBar from "../../components/shared/BottomBar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Threads",
    descript: "A Next.js 14 Meta Threads Application",
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <TopBar></TopBar>
                    <main className="flex flex-row">
                        <LeftSideBar></LeftSideBar>
                        <section className="main-container">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>
                        <RightSideBar></RightSideBar>
                    </main>
                    <BottomBar></BottomBar>
                </body>
            </html>
        </ClerkProvider>
    );
}
