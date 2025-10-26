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
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  color,
  setColor,
  size,
  setSize,
  gender,
  setGender,
  resultsCount,
}) => {
  return (
    <>
      <Navigator
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setCategory={setCategory}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        gender={gender}
        setGender={setGender}
        resultsCount={resultsCount}
      />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
