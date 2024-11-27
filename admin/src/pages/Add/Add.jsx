import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios"; // Fix axios import
import { toast } from "react-toastify";

const Add = ({url}) => {


  const [image, setImage] = useState(null); // Initialize image as null
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Restaurant",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Form field change handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target; // Destructure name and value
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      // Add form submission logic (e.g., API call)
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message) // Reset the image to null
      } else {
        setErrorMessage("Failed to add product. Please try again.");
        toast.error(response.data.message) // Reset the error message
      }
    } catch (error) {
      setErrorMessage("An error occurred during submission.");
    }
  };

  return (
    <div className="add">
      <div style={{
          textAlign: 'center',
          fontSize: '53px',
          position: 'relative',
          margin: '0 auto',
          transition: 'transform 0.3s ease, fontSize 0.3s ease',
          color:"teal"
        }}>
        ADD PRODUCT  
      </div>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col ">
          <p>Upload Image</p>
          <label htmlFor="image">
            {/* Display selected image or default placeholder */}
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Uploaded Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])} // Set selected image
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Write content here"
            rows="6"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              required
            >
              <option value="Restaurant">Restaurant</option>
              <option value="Ice">Ice Cream</option>
              <option value="Veg Table">Veg Table</option>
              <option value="Medicine">Medicine</option>
              <option value="Fruits">Fruits</option>
              <option value="Books">Books</option>
              <option value="Beverages">Beverages</option>

            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
