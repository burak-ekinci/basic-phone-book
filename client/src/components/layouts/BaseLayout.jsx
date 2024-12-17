import React from "react";
import NavbarComponent from "../ui/NavbarComponent";
import Footer from "../ui/Footer";

const BaseLayout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
