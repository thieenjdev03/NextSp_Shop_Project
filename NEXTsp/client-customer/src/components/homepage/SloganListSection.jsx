import React from "react";
import SloganItem from "./SloganItem";
import "../../assets/css/homepage.css";
function SloganListSection() {
  return (
    <div className="flex contents-center justify-center bg-w">
      <div className="SloganListSection flex flex-wrap ">
        <SloganItem 
          title="Giao hàng miễn phí"
          desc="Cho đơn hàng từ 500.000đ trở lên"
        />
        <SloganItem title="Hỗ trợ 24/7" desc="Hotline: 1900 1000" />
        <SloganItem
          title="Giảm giá 20%"
          desc="Cho đơn hàng từ 500.000đ trở lên"
        />
        <SloganItem
          title="Bảo Mật Thông Tin"
          desc="Đảm bảo thông tin khách hàng được bảo mật"
        />
      </div>
    </div>
  );
}

export default SloganListSection;