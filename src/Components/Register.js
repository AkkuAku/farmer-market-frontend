import { useState } from "react";
import { useNavigate } from "react-router-dom";

import icon from "../Assets/farm 1.png";
import "../Styles/Registration.css";

// Farmer Registration Form
const FarmerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    farmAddress: "",
    farmSize: "",
    cropTypes: [], // Updated to an array to store multiple selections
    iin: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle multiple selections for cropTypes
    if (name === "cropTypes") {
      const updatedCropTypes = checked
        ? [...formData.cropTypes, value] // Add selected crop
        : formData.cropTypes.filter((crop) => crop !== value); // Remove unselected crop
      setFormData({ ...formData, cropTypes: updatedCropTypes });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8383/farmer-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          deliveryAddress: "",
          paymentMethod: "",
        }); // Clear form fields on success
        alert("Registration successful!");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  const cropOptions = [
    "Wheat",
    "Corn",
    "Rice",
    "Soybeans",
    "Barley",
    "Cotton",
    "Sunflower",
    "Sugarcane",
    "Potatoes",
    "Tomatoes",
    "Onions",
    "Apples",
    "Grapes",
    "Oranges",
    "Bananas",
  ];

  return (
    <div className="farm-reg">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="farmAddress"
          placeholder="Farm Address"
          required
          value={formData.farmAddress}
          onChange={handleChange}
        />
        <input
          name="farmSize"
          placeholder="Farm Size (in acres)"
          required
          value={formData.farmSize}
          onChange={handleChange}
        />
        {/* Multiple selection for crop types */}
        <div className="crops">
          <div className="cropss">Types of Crops:</div>
          {cropOptions.map((crop, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="cropTypes"
                value={crop}
                checked={formData.cropTypes.includes(crop)}
                onChange={handleChange}
              />
              {crop}
            </label>
          ))}
        </div>
        <input
          name="iin"
          placeholder="IIN"
          required
          value={formData.iin}
          onChange={handleChange}
        />
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <label className="show">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="show"
          />
          Show Password
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// Buyer Registration Form
const BuyerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    paymentMethod: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8383/buyer-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          deliveryAddress: "",
          paymentMethod: "",
        }); // Clear form fields on success
        alert("Registration successful!");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  const paymentOptions = ["Credit Card", "PayPal", "Bank Transfer"];

  return (
    <div className="buyer-reg">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="deliveryAddress"
          placeholder="Delivery Address"
          required
          value={formData.deliveryAddress}
          onChange={handleChange}
        />
        <div className="payment">
          <label>Payment Method:</label>
          {paymentOptions.map((method, index) => (
            <label key={index}>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={handleChange}
                required
              />
              {method}
            </label>
          ))}
        </div>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <label className="show">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// Register Interface
const Register = () => {
  const [buyerReg, setBuyerReg] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="reg-page">
      <img src={icon} alt="logo" className="logo"></img>
      <div className="h1">Farmer Market</div>
      <div className="options">
        <div
          className={buyerReg ? "btn active" : "btn"}
          onClick={() => setBuyerReg(true)}
        >
          <div className="txt">Buyer</div>
          <div className="line"></div>
        </div>
        <div
          className={!buyerReg ? "btn active" : "btn"}
          onClick={() => setBuyerReg(false)}
        >
          <div className="txt">Farmer</div>
          <div className="line"></div>
        </div>
      </div>

      {buyerReg ? (
        <BuyerRegister></BuyerRegister>
      ) : (
        <FarmerRegister></FarmerRegister>
      )}

      <div className="login-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/")}>Log in</span>
      </div>
    </div>
  );
};

export default Register;
