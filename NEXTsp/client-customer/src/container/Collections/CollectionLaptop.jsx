import React from "react";
import { Breadcrumb, Header } from "../../components";
import "../../assets/css/collection.css";
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";

function Collection(props) {
<<<<<<< HEAD
  
=======
  const titleCollection = "Laptop";
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
  return (
    <div className="bg-gray-100 pb-10">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
<<<<<<< HEAD
      <Breadcrumb></Breadcrumb>
      <ProductList></ProductList>
      
=======
      <Breadcrumb titleCollection ={titleCollection}></Breadcrumb>
      <ProductList titleCollection ={titleCollection}></ProductList>
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
      <Paginnation></Paginnation>
      </div>
    </div>
  );
}

export default Collection;
