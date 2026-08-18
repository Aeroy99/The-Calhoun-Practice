import React from "react";
import "./styles.css";

export const metadata = {
  description: "Owned Payload CMS demo for The Calhoun Practice",
  title: "Calhoun Payload CMS",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
