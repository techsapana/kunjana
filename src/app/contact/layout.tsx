import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "NaturePure Organics | Contact | सम्पर्क",
};

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default LayoutPage;
