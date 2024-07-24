"use client";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { store } from "@/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <div className="flex">
              <div style={{width:"100%"}}>{children}</div>
            </div>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
