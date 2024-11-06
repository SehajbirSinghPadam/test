import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error getting orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };
  const statusHandler = async (event,orderId) => {
    const response = await axios.post(`${url}/api/order/status`,{
      orderId,
      status:event.target.value
    })
    if(response.data.success) {
      await fetchAllOrders();


  }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <div>No orders available.</div> // Handle the case where there are no orders
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} → {item.quantity}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city + ", " + 
                     order.address.state + ", " + 
                     order.address.country + ", " + 
                     order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone" >
                  {order.address.phone}
                </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for deli">Out for deli</option>
                <option value="Delivery Successfull">Delivery Successfull</option>

              </select>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
