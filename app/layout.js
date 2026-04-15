import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
         <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4e729ef6-1147-4067-9035-f90e2f95bb41"
        />
    
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-gray-50 dark:bg-gray-950 py-12 border-t border-gray-200 dark:border-gray-800">
              <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="text-center md:text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">Welth</p>
                  <p className="text-sm mt-1 mb-0">Smart AI-powered finance management.</p>
                </div>
                <div className="text-sm">
                  &copy; {new Date().getFullYear()} Welth. All rights reserved.
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
