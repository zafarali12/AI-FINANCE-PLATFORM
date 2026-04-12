import React from "react";
import { checkUser } from "@/lib/checkUser";

const MainLayout = async ({ children }) => {
  // Ensure user exists in database before accessing protected pages
  await checkUser();
  
  return <div className="container mx-auto my-32">{children}</div>;
};

export default MainLayout;
