import { NavLink } from "react-router-dom";
import "../layout/login.scss"
const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for login logic
        console.log('Login submitted');
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
                        <label htmlFor="email"></label>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <label htmlFor="password"></label>
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <NavLink to={"/signup"}>Sign up here</NavLink>
                </p>
            </div>
        </section>
    );
};


export default Login;