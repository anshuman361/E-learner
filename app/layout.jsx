"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PrivyProvider
          appId="cmnjzfrqx00p20cldixifuwra"
          config={{
            loginMethods: ["email", "google", "linkedin"],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
