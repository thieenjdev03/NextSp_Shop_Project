import React, { Fragment } from "react";
import "../assets/css/homepage.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTask } from "react-icons/bi";
import { BsHeadphones } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import SearchFunction from "./Header/SearchFunction";
import LogoPage from "../assets/img/Logo.png";
function Header(props) {
  const [Categories, setCategories] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [userId, setUserId] = useState("");
  const apiBrand = "http://localhost:3101/api/catalog/getlistcateandbrand";
  const apiUrl = "http://localhost:3101/api/auth/user";
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccountName(response.data.user.fullName);
        setUserId(response.data.user._id);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("accountName", response.data.user.fullName);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(apiBrand)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart[0]);
  };

  const [cart, setCart] = useState([]);
  const [counterCart, setCounterCart] = useState(null);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
    setCounterCart(cartData.length);
  }, []);

  return (
    <div>
      <div className="header z-20 flex justify-center">
        <div className="header_logo">
          <img className="" src={LogoPage} alt="" />
        </div>
        <div className="navbar flex ">
          <a href="/Homepage">Trang Chủ</a>
          <a href="/Blog">Bài Viết</a>
          <div className="dropdown relative">
            <div className="dropdown-btn-container flex justify-center items-center">
              <a
                href="/Collection"
                className="dropbtn flex justify-center items-center"
              >
                <FontAwesomeIcon className="mr-1" icon={faBars} />
                Danh Mục
                <i className="fa fa-caret-down"></i>
              </a>
              <div className="dropdown-content flex flex-col w-48 ">
                {Categories &&
                  Categories.map((category) => {
                    if (category.status === "Active") {
                      return (
                        <div
                          className="category-item text-black flex contents-center w-48"
                          key={category._id}
                        >
                          <a
                            className="category-link"
                            href={`/Collection/${category.nameCategory}`}
                          >
                            {category.nameCategory}
                            <FontAwesomeIcon
                              className="category-icon"
                              icon={faCaretRight}
                            />
                          </a>
                          <div className="brand-menu">
                            {category.brands &&
                              category.brands.map((brand) => (
                                <a
                                  className="brand-link"
                                  href={`/Collection/${category.nameCategory}/${brand.nameBrand}`}
                                  key={brand._id}
                                >
                                  {brand.nameBrand}
                                </a>
                              ))}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
        <SearchFunction />
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
            <a href="/Account" className="w-20">
              Trạng Thái Đơn Hàng
            </a>
          </div>
          <div className="navItem opacity-60 hover:cursor-pointer hover:opacity-100 text-sm">
            <div className="boxIcon">
              <PiShoppingCartSimpleBold></PiShoppingCartSimpleBold>
            </div>
            <div className="number-counter">{counterCart}</div>
            <Link to={"/CartPage"}>Giỏ Hàng </Link>
          </div>
          <div className="header_user_module">
            {localStorage.getItem("accessToken") === null ? (
              <Link to="/LoginUser">
                <button className="user_module_login">
                  <div className="boxIcon">
                    <AiOutlineUser />
                  </div>
                  <p>Đăng Nhập</p>
                </button>
              </Link>
            ) : (
              <button className="user_module_login">
                <div className="boxIcon">
                  <AiOutlineUser />
                </div>
                <p>Hello, {accountName}</p>
              </button>
            )}
          </div>
          <div className="logOutSection">
            {localStorage.getItem("accessToken") !== null ? (
              <button
                className="logOutButton"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("accountName");
                  localStorage.removeItem("accountRole");
                  window.location.reload();
                }}
              >
                Đăng Xuất
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
