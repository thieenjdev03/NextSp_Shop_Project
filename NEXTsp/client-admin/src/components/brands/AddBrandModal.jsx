import React, { Fragment, useContext, useState, useEffect } from "react";
import { BrandContext } from "./index";
import { createBrand, getAllBrand } from "./FetchAPI";
import { getAllCategory } from "../categories/FetchApi";

const AddBrandDetail = ({ categories }) => {
  const { data, dispatch } = useContext(BrandContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    nameBrand: "",
    description: "",
    status: "Active",
    category: "",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllBrand();
    setTimeout(() => {
      if (responseData && responseData.Brands) {
        dispatch({
          type: "fetchBrandAndChangeState",
          payload: responseData.Brands,
        });
      }
    }, 1000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();

    if (!fData.nameBrand) {
      setFdata({ ...fData, error: "Please give the name!" });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 100);
    }

    try {
      let responseData = await createBrand(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          nameBrand: "",
          description: "",
          status: "Active",
          category: "",
          success: responseData.success,
          error: false,
        });
        setFdata({
          ...fData,
          nameBrand: "",
          description: "",
          status: "Active",
          category: "",
          success: "Add brand complete",
          error: false,
        });
        setTimeout(() => {
          window.location.reload();
        },1000)
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addBrandModal", payload: false })}
        className={`${
          data.addBrandModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addBrandModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "addBrandModal", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-full flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={fData.nameBrand}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      nameBrand: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                value={fData.description}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    description: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={fData.status}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      status: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Category *</label>
                <select
                  value={fData.category}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      category: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map(function (elem) {
                        return (
                          <option name="status" value={elem._id} key={elem._id}>
                            {elem.nameCategory}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddBrandModal = (props) => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [allCat, setAllCat] = useState({});

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData) {
      setAllCat(responseData);
    }
  };

  return (
    <Fragment>
      <AddBrandDetail categories={allCat} />
    </Fragment>
  );
};

export default AddBrandModal;
