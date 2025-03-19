// src/pages/RSVP.js
import React, { useState } from 'react';

function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    foodOption: "",
    plusOneName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Store form validation errors

  // Regex for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.foodOption) newErrors.foodOption = "Please select a food option.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/rsvps");
      if (!response.ok) throw new Error("Failed to fetch RSVPs");
      const rsvps = await response.json();

      const existingRSVP = rsvps.find(
        (rsvp) =>
          rsvp.name.toLowerCase() === formData.name.toLowerCase() &&
          rsvp.email.toLowerCase() === formData.email.toLowerCase()
      );

      let serverResponse;
      if (existingRSVP) {
        serverResponse = await fetch(`http://localhost:5000/rsvps/${existingRSVP.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        serverResponse = await fetch("http://localhost:5000/rsvps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!serverResponse.ok) throw new Error("Failed to submit RSVP");

      setMessage(existingRSVP ? "Your RSVP has been updated successfully!" : "RSVP submitted successfully!");
      setFormData({ name: "", email: "", foodOption: "", plusOneName: "" });
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <select
          name="foodOption"
          value={formData.foodOption}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.foodOption ? "border-red-500" : "border-gray-300"} rounded`}
          required
        >
          <option value="">Select Food Option</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Chicken">Chicken</option>
          <option value="Beef">Beef</option>
        </select>
        {errors.foodOption && <p className="text-red-500 text-sm">{errors.foodOption}</p>}
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="plusOneName"
          placeholder="Plus One Name (Optional)"
          value={formData.plusOneName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit RSVP"}
      </button>

      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </form>
  );
};


export default RSVP;
