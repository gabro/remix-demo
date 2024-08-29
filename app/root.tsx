import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-full">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Pokémix</h1>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 Pokémix. All rights reserved.</p>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
