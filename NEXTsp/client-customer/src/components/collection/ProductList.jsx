import React, { useState, useEffect } from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ButtonBuyNow from "../buttons/buttonBuyNow";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import Pagination from "./Pagination";
import { BsSortDown } from "react-icons/bs";
import StarRating from "../Products/StarRating";

function ProductList(props) {
  const { category, nameCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 10;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ApiProducts = "https://nextsp-server.id.vn/api/products/getall";

  useEffect(() => {
    axios
      .get(ApiProducts)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [ApiProducts]);
  function shortenProductName(productName, maxLength) {
    if (productName.length <= maxLength) {
      return productName;
    } else {
      return productName.substring(0, maxLength - 3) + "...";
    }
  }
  useEffect(() => {
    if (products) {
      const productByCategory = products.filter(
        (product) => product.category && product.category.name === category
      );
      const productByBrand = products.filter((product) => {
        if (!product.brand && !nameCategory) {
          return true;
        }
        return (
          product.brand && product.brand.name === nameCategory &&
          product.category && product.category.name === category
        );
      });
  
      nameCategory === null
        ? setFilteredProducts(productByCategory)
        : setFilteredProducts(productByBrand);
    } else {
      console.log("No products");
      setFilteredProducts([]);
    }
  }, [category, nameCategory, products]);
  
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available";
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortIncreasing = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setFilteredProducts(sortedProducts);
  };

  const sortDecreasing = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setFilteredProducts(sortedProducts);
  };
  let productListContent;

  if (!products || products.length === 0) {
    productListContent = <p>Không có sản phẩm.</p>;
  } else {
    const AvailableProducts = products.filter(
      (product) =>
        (product.status === "Active" &&
          product.category &&
          product.category.name === props.CollectionCategory) ||
        (product.brand &&
          product.brand.name === props.CollectionBrand &&
          product.status === "Active")
    );

    productListContent = AvailableProducts.map(
      (product, index) =>
        index < 5 && (
          <div
            key={product.id}
            className="productItem flex flex-col border-black-500/100 gap-1 items-center justify-center"
          >
            <Link to={`/products/${product.id}`}>
              <div className="product_image w-full h-52 object-cover">
                <img
                  src={
                    product.images[0] == null
                      ? imagePlaceHolder
                      : product.images[0]
                  }
                  alt=""
                  className="w-full h-44 object-contain "
                />
              </div>
              <div className="textSection w-full flex flex-col">
                <div className="product_title text-left">
                  <h1 className="h-20">
                    {shortenProductName(product.nameProduct, 50)}
                  </h1>
                </div>
                <div>
                  <p className="product_oldPrice text-left">
                    {formatPrice(product.oldprice)}
                  </p>
                  <p className="product_price text-left">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
              <div className="product_rating h-3 flex gap-1 items-center">
                <StarRating rating={product.averageRating} />
                <p className="text-xs">({product.numReviews} đánh giá)</p>
              </div>
            </Link>
            <div className="over-button flex gap-4 items-center justify-center mt-3">
              <ButtonBuyNow product={product} />
              <ButtonAddToCart product={product} />
            </div>
          </div>
        )
    );
  }

  return (
    <div className="productList max-h-full w-full bg-white rounded-md pb-8">
      <h1 className="CategoryTitle">
        {nameCategory == null ? category : nameCategory}
      </h1>
      <div className="flex gap-6 ml-20 mt-6">
        <div>
          <button className="btnFilter btnSort" onClick={toggleDropdown}>
            <BsSortDown></BsSortDown>Sắp Xếp Theo
          </button>

          {isOpen && (
            <div className="sort-dropdown flex flex-col">
              <button onClick={sortIncreasing}>Giá: Thấp đến Cao</button>
              <button onClick={sortDecreasing}>Giá: Cao đến Thấp</button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 min-w-4/5 justify-center pt-12 items-center pb-8 mr-auto ml-auto">
      {productListContent}
      </div>
      <Pagination
        pageIndex={pageIndex}
        pageCount={Math.ceil(
          (Array.isArray(products) ? products.length : 0) / itemsPerPage
        )}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
