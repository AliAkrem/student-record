import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";


import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "Student Registration",
  description: "Student Registration web app",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
