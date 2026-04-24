import { useState } from 'react';
import portfolioData from '../data/portfolioData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const { personal } = portfolioData;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to connect to server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Say Hello</span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have a project in mind or want to discuss an opportunity? Let's connect!
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <div className="contact-info-list">
                <div className="glass-card contact-info-item">
                  <div className="icon">📍</div>
                  <div>
                    <div className="label">Location</div>
                    <div className="value">{personal.location}</div>
                  </div>
                </div>
                <div className="glass-card contact-info-item">
                  <div className="icon">✉</div>
                  <div>
                    <div className="label">Email</div>
                    <div className="value">{personal.email}</div>
                  </div>
                </div>
                <div className="glass-card contact-info-item">
                  <div className="icon">📱</div>
                  <div>
                    <div className="label">Phone</div>
                    <div className="value">{personal.phone}</div>
                  </div>
                </div>
              </div>

              <div className="contact-socials" style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  ⟨/⟩
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="social-link"
                  title="Email"
                >
                  @
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    id="contact-name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    id="contact-email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={handleChange}
                    id="contact-phone"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    id="contact-message"
                  />
                </div>

                {status && (
                  <div className={`form-status ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  id="contact-submit"
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
