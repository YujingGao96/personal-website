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
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Yujing Gao",
    },
};

export const viewport = {
    colorScheme: "dark",
    themeColor: "#05050d",
    viewportFit: "cover",
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

    const darkAppearance = {
        variables: {
            colorBackground: "#1a1a24",
            colorForeground: "#ffffff",
            colorInputBackground: "rgba(255,255,255,0.06)",
            colorInput: "rgba(255,255,255,0.06)",
            colorText: "#ffffff",
            colorTextSecondary: "rgba(255,255,255,0.78)",
            colorMutedForeground: "rgba(255,255,255,0.82)",
            colorPrimary: "#7b6dd6",
            colorPrimaryForeground: "#ffffff",
            colorInputText: "#ffffff",
            colorInputForeground: "#ffffff",
            colorTextOnPrimaryBackground: "#ffffff",
            colorNeutral: "#ffffff",
            colorShimmer: "rgba(255,255,255,0.08)",
            colorDanger: "#e4899a",
            colorSuccess: "#1ad1ee",
            colorWarning: "#f49f22",
            colorModalBackdrop: "rgba(0,0,0,0.42)",
            fontFamily: '"Onest", sans-serif',
        },
        elements: {
            rootBox: {
                fontFamily: '"Onest", sans-serif',
                width: "100%",
                boxShadow:
                    "7px 3px 7px 4px rgb(0 0 0 / 50%), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.2)",
                borderRadius: "2em",
                background: "rgba(33, 33, 41, 0.45)",
                backdropFilter: "saturate(180%) blur(8px)",
            },
            cardBox: {
                width: "100%",
            },
            card: {
                background: "transparent"
            },
            headerTitle: {
                color: "#ffffff",
                fontWeight: 600,
            },
            headerSubtitle: {
                color: "rgba(255,255,255,0.85)",
            },
            socialButtonsBlockButton: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
            },
            socialButtonsBlockButton__hover: {
                background: "rgba(255,255,255,0.12)",
            },
            socialButtonsBlockButtonText: {
                color: "#ffffff",
                fontWeight: 500,
            },
            socialButtonsProviderIcon: {
                filter: "brightness(1.1)",
            },
            socialButtonsProviderIcon__github: {
                color: "#ffffff",
                fill: "#ffffff",
                filter: "invert(1) brightness(2)",
                opacity: 1,
            },
            providerIcon__github: {
                color: "#ffffff",
                fill: "#ffffff",
                filter: "invert(1) brightness(2)",
                opacity: 1,
            },
            socialButtonsBlockButtonArrow: {
                color: "rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
            },
            lastAuthenticationStrategyBadge: {
                color: "#f6f2ff",
                background: "rgba(181,147,225,0.2)",
                border: "1px solid rgba(208,182,255,0.55)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
            },
            dividerLine: {
                background: "rgba(255,255,255,0.15)",
            },
            dividerText: {
                color: "rgba(255,255,255,0.7)",
            },
            formFieldLabel: {
                color: "#ffffff",
                fontWeight: 500,
            },
            formFieldInput: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#ffffff",
                "::placeholder": {
                    color: "rgba(255,255,255,0.55)",
                },
            },
            formFieldInput__focus: {
                borderColor: "#b593e1",
                boxShadow: "0 0 0 3px rgba(181,147,225,0.25)",
            },
            formFieldInputShowPasswordButton: {
                color: "rgba(255,255,255,0.7)",
            },
            formButtonPrimary: {
                background: "linear-gradient(135deg, #7b6dd6, #b593e1)",
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(123,109,214,0.45)",
            },
            formButtonPrimary__hover: {
                background: "linear-gradient(135deg, #8a7ce4, #c4a3f0)",
            },
            footer: {
                background: "transparent",
            },
            footerActionText: {
                color: "rgba(255,255,255,0.75)",
            },
            footerActionLink: {
                color: "#b593e1",
                fontWeight: 500,
            },
            footerActionLink__hover: {
                color: "#d0b6ff",
            },
            identityPreviewText: {
                color: "#ffffff",
            },
            identityPreviewEditButton: {
                color: "#b593e1",
            },
        },
    };

    return hasClerkConfig() ? <ClerkProvider appearance={darkAppearance}>{layout}</ClerkProvider> : layout;
}
