import { useState } from "react";
import "../Styles/Registration.css";

const FarmerRegister = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isPasswordValid = (password) => {
    const minLength = /.{8,}/;
    const startsWithUppercase = /^[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      startsWithUppercase.test(password) &&
      hasLowercase.test(password) &&
      hasUppercase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(formData.password)) {
      alert(
        "Password must be at least 8 characters long, start with an uppercase letter, and contain a lowercase letter, an uppercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8383/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({ email: "", password: "" }); // Clear form fields on success
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <div>
        <input
          name="password"
          type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
          placeholder="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle visibility state
          />
          Show Password
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default FarmerRegister;
