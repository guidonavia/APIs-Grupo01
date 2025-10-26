import React from "react";
import Navigator from "./Navigator";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({
  children,
  search,
  setSearch,
  selectedCategory,
  setCategory,
}) => {
  return (
    <>
      <Navigator
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setCategory={setCategory}
      />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
