import "./globals.css";

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
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
