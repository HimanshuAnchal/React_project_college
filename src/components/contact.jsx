import "../layout/contact.scss"
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        reason: ""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            console.log("Form submitted successfully ✅");
            setSuccess(true);
            setFormData({ name: "", email: "", reason: "" });
            setError("");
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Failed to submit form. Try again!");
            setSuccess(false);
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="input-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <textarea
                            id="reason"
                            name="reason"
                            placeholder="Enter your reason for contact"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit">Submit</button>
                    {success && <p className="success-msg">Form submitted successfully!</p>}
                    {error && <p className="error-msg">{error}</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
