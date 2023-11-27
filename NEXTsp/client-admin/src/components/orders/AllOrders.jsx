import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import moment from "moment";
import { getAllOrders } from "./FetchApi";
import { OrderContext } from "./index";

const apiURL = process.env.REACT_APP_ORDERS

const AllOrders = () => {
  const { data, dispatch } = useContext(OrderContext);
  const [order, setOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  // Fetch all orders on component mount
  const fetchData = async () => {
    try {
      const responseData = await getAllOrders();
      setOrder(responseData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Fetch data every 10 seconds
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const sortOrders = () => {
    let sortedOrders = [...order];
    if (sortOrder === 'asc') {
      sortedOrders.sort((a, b) => a.totalPrice - b.totalPrice);
    } else {
      sortedOrders.sort((a, b) => b.totalPrice - a.totalPrice);
    }
    setOrder(sortedOrders);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  const deleteOrder = async (_id) => {
    // Show a confirmation dialog
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await axios.delete(`${apiURL}/delete/${_id}`);
        // Fetch data again after successful deletion
        // eslint-disable-next-line no-undef
        fetchData();
        return res.data;
      } catch (error) {
        alert("You can't not delete this order!")
      }
    }
  }
  
  const updateTracking = async (_id, newTracking) => {
    if (window.confirm("Are you sure you want to update this order?")) {
      try {
        const res = await axios.put(`${apiURL}/update/${_id}`, { tracking: newTracking });
        // Fetch data again after successful deletion
        // eslint-disable-next-line no-undef
        fetchData();
        return res.data;
      } catch (error) {
        alert("You can't not update this order!")
      }
    }
  }

  useEffect(() => {
    sortOrders();
  }, [sortOrder]);
  

  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders()
  };
  


  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#fff"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
          ></path>
        </svg>
      </div>
    );
  }
  if (error) {
    return <div>ERROR...</div>;
  }
  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>
      </div>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 w-1/3 border">Products</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border ">Payment</th>
              <th className={`px-4 py-2 border ${sortOrder === 'desc' ? ' bg-black/10 shadow-inner' : ''}`} onClick={toggleSortOrder}>
                Total {sortOrder === 'desc' ? '↑' : '↓'}
              </th>
              <th className="px-4 py-2 w-[9.666667%] border">Created at</th>
              <th className="px-4 py-2 border">Tracking</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders && currentOrders.length > 0 ? (
              currentOrders.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="px-4 py-2 border text-sm">
                      {item.product?.map((elem, i) => {
                        // Check if productId exists before accessing nameProduct
                        if (elem.productId) {
                          const productName = elem.productId.nameProduct;
                          return (
                            <div key={i}>
                              <p>{productName + "; "}</p>
                            </div>
                          );
                        }
                        // If productId does not exist, return null
                        return null;
                      })}
                    </td>
                    <td className="px-4 py-2 border text-sm">{item.userId ? item.userId.fullName : 'N/A'}</td>
                    <td className="px-4 py-2 border text-sm">{item.userId ? item.userId.email.slice(0, 10) + "..." : 'N/A'}</td>
                    <td className="px-4 py-2 border text-sm">{item.address}</td>
                    <td className="px-4 py-2 border text-sm text-center">{item.payment}</td>
                    <td className="px-4 py-2 border text-sm">{item.totalPrice}</td>
                    <td className="px-4 py-2 border text-sm text-center">
                      {moment(item.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-4 py-2 border">
                      <select value={item.tracking}
                        onChange={(e) => updateTracking(item._id, e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="shipping">shipping</option>
                        <option value="delivered">delivered</option>
                        <option value="done">done</option>
                        <option value="cancel">cancel</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => deleteOrder(item._id, dispatch)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination flex justify-end space-x-2">
          {[...Array(Math.ceil(order.length / ordersPerPage)).keys()].map(number => (
            <button 
              key={number + 1} 
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AllOrders;
