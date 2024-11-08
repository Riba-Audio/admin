import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import AuthProvider from "@/auth/auth-provider";

import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import SideBar from "@/components/utils/side-bar";
import baseMetadata from "@/assets/metadata";

const inter = Inter({ subsets: ["latin"] });
const {keywords, description, title, url, siteName} = baseMetadata; 

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s - ${title}`,
    default: title
  },
  description,
  applicationName: "Riba Audiobook Admin",
  keywords,
  authors: [{name: "Kinyua Nyaga"}],
  creator: "Kinyua Nyaga",
  publisher: "Kinyua Nyaga",
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en-US'
    }
  },
  openGraph: {
    title,
    description, 
    url,
    siteName,
    type: "website",
    // images: [
    //   {url: `${url}/api/og`}
    // ]
  },
  twitter: {
      card: "summary_large_image",
      title,
      description, 
      // images: [`${url}/api/og`]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(`${inter.className} flex h-[100vh] w-[100vw] bg-secondary`)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider
                authType='cookie'
                authName='_auth'
          >
            <SideBar />
            {children}
          </AuthProvider>
          <ToasterProvider />
      </ThemeProvider>
    </body>
    </html >
  );
}
