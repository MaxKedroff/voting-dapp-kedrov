import { ReactNode } from "react";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";

export const metadata = {
  title: "Voting DApp",
  description: "Blockchain voting application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
}
