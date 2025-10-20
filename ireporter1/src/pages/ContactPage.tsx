import Navbar from '../components/ui/Navbar';

import '../styles/HomePage.css';

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p className="hero-subtitle">
              We'd love to hear from you. Get in touch with us.
            </p>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📧</div>
                <h3>Email</h3>
                <p>support@ireporter.com</p>
                <p className="mt-sm">For general inquiries and support</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📞</div>
                <h3>Phone</h3>
                <p>+250 XXX XXX XXX</p>
                <p className="mt-sm">Monday - Friday, 8AM - 6PM</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📍</div>
                <h3>Office</h3>
                <p>Kampala, Uganda</p>
                <p className="mt-sm">KG 123 St, Masaka District</p>
              </div>
            </div>

            <div className="card mt-lg" style={{ maxWidth: '600px', margin: '2rem auto' }}>
              <h2 className="mb-md">Send us a Message</h2>
              <form className="flex-column gap-md">
                <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your name" required />
                </div>
                
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" required />
                </div>
                
                <div>
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" placeholder="What is this about?" required />
                </div>
                
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={5} placeholder="Your message..." required></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2024 iReporter. Making a difference, one report at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;