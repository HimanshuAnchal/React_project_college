import "../layout/signup.scss"
import { NavLink } from "react-router-dom";

const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for signup logic
        console.log('Signup submitted');
    };

    return (
        <section className="signup-section">
            <div className="signup-container">
                <h2>Create Your Account</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            required
                        />

                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Enter your contact number"
                            required
                        />

                    </div>
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
                    <button type="submit" className="btn-signup">Sign Up</button>
                </form>
                <div className="social-login">
                    <p>Or sign up with</p>
                    <div className="social-buttons">
                        <NavLink className="social-btn google" title="Google">
                            <i className="fab fa-google"></i>
                        </NavLink>
                        <NavLink className="social-btn facebook" title="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </NavLink>
                        <NavLink className="social-btn twitter" title="X (Twitter)">
                            <i className="fab fa-x-twitter"></i>
                        </NavLink>
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