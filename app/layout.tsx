// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import CartSheet from "@/components/cart-sheet";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My E-commerce Store",
  description: "Built with Next.js 15, Tailwind, shadcn/ui and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang={inter.className} suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              {/* Header */}
              <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                  <h1 className="text-2xl font-bold">MyStore</h1>

                  <div className="flex items-center gap-4">
                    <CartSheet />

                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="default" size="sm">
                          Sign in
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </header>

              {/* Main content */}
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>

              {/* Footer */}
              <footer className="border-t py-6 text-center text-sm text-muted-foreground">
                © 2025 MyStore. All rights reserved.
              </footer>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
