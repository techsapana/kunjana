import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "NaturePure Organics | About Us | हाम्रो बारेमा",
};

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default LayoutPage;
