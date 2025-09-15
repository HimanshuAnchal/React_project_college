import "../layout/signup.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Email + Password Signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            console.log("User created:", userCredential.user);
            setSuccess("Account created successfully! 🎉");

            // Redirect to home after signup
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Google Sign-In
    const handleGoogleSignup = async () => {
        if (loading) return; // prevent double-click
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google user:", result.user);
            setSuccess("Signed up with Google successfully! 🎉");

            // Redirect to home after signup
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="signup-section">
            <div className="signup-container">
                <h2>Create Your Account</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Enter your contact number"
                            required
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn-signup" disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <div className="social-login">
                    <p>Or sign up with</p>
                    <div className="social-buttons">
                        <button
                            className="social-btn google"
                            onClick={handleGoogleSignup}
                            disabled={loading}
                        >
                            <i class="fa-brands fa-google"></i>{" "}
                            {loading ? "Signing in..." : ""}
                        </button>
                    </div>
                </div>

                <p className="login-link">
                    Already have an account? <NavLink to={"/login"}>Login here</NavLink>
                </p>
            </div>
        </section>
    );
};

export default Signup;
