import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Styles/Registration.css";

// login Form
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameOrPass: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Login
        <input
          name="nameOrPass"
          placeholder="Username / Email"
          type="email"
          required
          value={formData.nameOrPass}
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
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>
        <button type="submit">Login</button>
      </form>

      <div className="btn reg-btn" onClick={() => navigate("/register")}>
        Register
      </div>
    </>
  );
};

export default Login;
