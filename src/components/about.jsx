import "../layout/about.scss"
const About = () => {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            caption: 'Empowering students with organized tools'
        },
        {
            src: 'https://images.unsplash.com/photo-1642543492457-39a2ce63bb59?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            caption: 'Collaborative learning environment'
        },
        {
            src: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            caption: 'Streamlined task management'
        }
    ];

    return (
        <section className="about-section">
            <div className="container">
                <h1>About Us</h1>
                <div className="about-content">
                    <p>
                        At Student Record Web App, we are dedicated to simplifying academic life for students and educators.
                        Founded with a passion for education and technology, our platform empowers users to manage their
                        academic tasks efficiently. From organizing todo lists to tracking assignments, we provide intuitive
                        tools to help students stay on top of their studies and achieve their goals. Our mission is to create
                        a seamless, user-friendly experience that supports academic success for all.
                    </p>
                    <p>
                        Our team is committed to continuous improvement, incorporating user feedback to enhance functionality
                        and ensure accessibility across all devices. Whether you're a student juggling multiple assignments or
                        an educator managing records, we're here to make your academic journey smoother and more productive.
                    </p>
                </div>
                <div className="image-gallery">
                    {images.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.src} alt={image.caption} />
                            <p className="image-caption">{image.caption}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default About;