import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios"; 
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);


  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list");
    }
  };
const removeFood =async(foodId) =>{
  const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  await fetchList();
  if (response.data.success) {
    toast.success("Successfully removed");
    
  }else{
    toast.error("An error occurred while"); 
  }

}
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p style={{
          textAlign: 'center',
          fontSize: '53px',
          position: 'relative',
          margin: '0 auto',
          transition: 'transform 0.3s ease, fontSize 0.3s ease',
          color:"teal"
        }} >All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img
                  src={`${url}/images/${item.image}`}
                  alt={`${item.name} image`}
                />
                <p style={{
                  color: "Black",
                  fontSize: '20px'
                }} > <b>{item.name}</b></p>
                <p
                style={{
                  color: "Black",
                  fontSize: '20px'
                }}
                >{item.category}</p>
                <p
                style={{
                  color: "Black",
                  fontSize: '20px'
                }}
                >₹ {item.price} /-</p>
                <p onClick={()=>removeFood(item._id)} className="cursor" >
                  {/* Add functionality for the "X" button here, e.g., delete */}
                  X
                </p>
              </div>
            );
          })
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default List;
