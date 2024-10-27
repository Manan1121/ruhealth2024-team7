// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "CleartBill: AI Powered Bill Analyzer",
  description: "An AI-powered tool for billing transparency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-900 text-white min-h-screen flex flex-col">
        <main>{children}</main>
      </body>
    </html>
  );
}
