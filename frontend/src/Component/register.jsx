import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordvalidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!passwordvalidate.test(formData.password)) {
            alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        try {
            await axios.post("http://127.0.0.1:8000/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert("User registered successfully!");
            navigate("/login");
            setFormData({ username: "", email: "", password: "", confirmPassword: "" }); // Reset form

        } catch (error) {
            console.error("Axios error:", error);
            if (error.response) {
                alert("Error: " + (error.response.data.error || "Something went wrong"));
            } else {
                alert("Failed to connect to the server. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2 className="register_title">REGISTER</h2>
            <form onSubmit={handleSubmit}>
                <div className="text">Name</div>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <div className="text">Email</div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <div className="text">Password</div>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <div className="text">Confirm Password</div>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

                <br />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
