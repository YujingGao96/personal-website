import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import NavBar from "../components/home/navbar/NavBar";
import {hasClerkConfig} from "../lib/blog/config";

export const metadata = {
    title: "Welcome to Yujing Gao's Website",
    description: "Personal website for Yujing Gao",
    icons: {
        icon: "/favicon.ico",
    },
    manifest: "/manifest.json",
};

export const viewport = {
    themeColor: "#000000",
};

export default function RootLayout({children}) {
    const layout = (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                <NavBar/>
                {children}
            </body>
        </html>
    );

    return hasClerkConfig() ? <ClerkProvider>{layout}</ClerkProvider> : layout;
}
