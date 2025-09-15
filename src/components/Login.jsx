import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // Import auth from firebase.js
import "../layout/login.scss";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // Firebase login with email/password
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful! 🎉");
            navigate("/student"); // redirect after login
        } catch (err) {
            console.error("Login failed:", err.message);
            setError("Invalid email or password. Please try again.");
        }
    };

    // Google login handler
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("Google login successful! 🎉");
            navigate("/student");
        } catch (err) {
            console.error("Google login failed:", err.message);
            setError("Google login failed. Try again.");
        }
    };

    return (
        <section className="login-section">
            <div className="login-container">
                <h2>Login to Your Account</h2>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>

                <button onClick={handleGoogleLogin} className="btn-google">
                    Sign in with Google
                </button>

                {error && <p className="error-text">{error}</p>}

                <p className="signup-link">
                    Don't have an account? <NavLink to="/signup">Sign up here</NavLink>
                </p>
            </div>
        </section>
    );
};

export default Login;
