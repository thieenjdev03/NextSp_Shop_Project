import React, { Fragment } from "react";
import "../assets/css/homepage.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faCaretRight,
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTask } from "react-icons/bi";
import { BsHeadphones } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
function Header(props) {
  const [Categories, setCategories] = useState(null);
  const [Brands, setBrands] = useState(null);

  useEffect(() => {
    // Define the API URLs
    const apiUrl1 = "http://localhost:3003/Categories";
    const apiUrl2 = "http://localhost:3003/Brands";
    // Make parallel requests
    const request1 = axios.get(apiUrl1);
    const request2 = axios.get(apiUrl2);

    // Wait for both requests to complete
    Promise.all([request1, request2])
      .then(([response1, response2]) => {
        setCategories(response1.data);
        setBrands(response2.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Fragment>
      <div className="header z-20 fixed flex justify-center ">
        <div className="header_logo"></div>
        <div class="navbar">
          <a href="../Homepage">Trang Chủ</a>
          <a href="/Blog">Bài Viết</a>
          <div className="dropdown">
          <button className="dropbtn">
            <FontAwesomeIcon className="mr-1" icon={faBars} />
            Danh Mục
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content flex flex-col">
            {Categories &&
              Categories.map((category) => (
                <div className="category-item text-black flex contents-center " key={category.categoryName}>
                  <a
                    className="category-link"
                    href={`/Collection/${category.categoryLink}`}
                  >
                    {category.categoryName}
                    <FontAwesomeIcon
                      className="category-icon"
                      icon={faCaretRight}
                    />
                    </a>
                  <div className="brand-menu">
                    {Brands &&
                      Brands.map((brand) => {
                        if (brand.categoryId === category.categoryId) {
                          return (
                            <a
                              className="brand-link"
                              href={`/Collection/${brand.brandLink}`}
                              key={brand.brandName}
                            >
                              {brand.brandName}
                            </a>
                          );
                        }
                      })}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        </div>
        <div className="header_searching_module">
          <div class="wrap">
            <div class="search">
              <input
                type="text"
                class="searchTerm text-black"
                placeholder="Nhập Thứ Cần Tìm Kiếm"
              ></input>
              <button type="submit" class="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="header_right_section pl-4 pr-4">
          <div className=" navItem tracking-order opacity-60 hover:cursor-pointer hover:opacity-100">
            <div className="boxIcon">
              <BsHeadphones></BsHeadphones>
            </div>
            <p className="">Hotline 1900.9999</p>
          </div>
          <div className=" navItem tracking-order opacity-60 hover:cursor-pointer hover:opacity-100">
            <div className="boxIcon">
              <BiTask></BiTask>
            </div>
            <p className="">Trạng Thái Đơn Hàng</p>
          </div>
          <div className="navItem opacity-60 hover:cursor-pointer hover:opacity-100 text-sm">
            <div className="boxIcon">
              <PiShoppingCartSimpleBold></PiShoppingCartSimpleBold>
            </div>
            <p>Giỏ Hàng</p>
          </div>
          <div className="header_user_module">
            <Link to="/Login">
              <button className="user_module_login">
                <div className="boxIcon">
                  <AiOutlineUser></AiOutlineUser>
                </div>
                <p>Đăng Nhập</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;