import { NavLink } from "react-router-dom";
import "../layout/home.scss"
const Home = () => {
    return (
        <section className="hero">
            <h1>Welcome to Check List Web App</h1>
            <p>
                Organize your academic tasks efficiently with our intuitive platform. Create and manage todo lists,
                track assignments, and stay on top of your studies with ease.
            </p>
            <NavLink to={"/login"} className="btn-get-started">Get Started</NavLink>
        </section>
    );
};

export default Home;