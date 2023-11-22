import React from "react";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import {
  Header,
  BannerSales,
  BannerScroll,
  SloganListSection,
  ProductList,
  Footer,
  BannerTop,
} from "../components";
import "../assets/css/homepage.css";
import "../assets/css/main.css";
import ProductListAll from "../components/homepage/ProductListAll";
function Homepage(props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="">
      {isLoading ? (
        <div className="loading w-full h-full flex justify-center content-center items-center">
          <RiseLoader color="#212529" />
        </div>
      ) : null}
      <div>
        <Header />
        <div className="container_content mt-[56px] color-bg">
          <BannerScroll />
          <div className="container-product-section inline-block relative">
            <div className="flex flex-col contents-center mr-auto ml-auto gap-10">
              <SloganListSection />
              <ProductListAll />
              <ProductList
                title="PC Máy Tính Bàn - Intel"
                CollectionBrand="Samsung"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
