import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';

emailjs.init('ANG8Bxt75tbHk2y2U');

const SERVICE_ID = 'service_okborg6';
const TEMPLATE_ID = 'template_783gw16';

export default function Contact() {
  usePageMeta(
    'Contact — Hamday Rabby Hossain',
    'Get in touch about AI engineering and backend roles.'
  );
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      })
      .then(() => {
        setStatus({
          type: 'success',
          message: `Sent. I’ll reply within ${profile.responseTime}.`,
        });
        setForm({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus({
          type: 'error',
          message: `Sending failed — please email ${profile.email} directly.`,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="lede" style={{ marginTop: '1.25rem', maxWidth: '18ch' }}>
            Write to me about a role, a system, or a decision you&rsquo;d have made differently.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <dl className="contact-direct">
              <div className="contact-item">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`} className="link">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="contact-item">
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="contact-item">
                <dt>Elsewhere</dt>
                <dd style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.codeforces}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Codeforces
                  </a>
                </dd>
              </div>
              <div className="contact-item">
                <dt>Status</dt>
                <dd style={{ fontSize: 'var(--step-0)', color: 'var(--muted)' }}>
                  {profile.availability}
                </dd>
              </div>
            </dl>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              {status && <p className={`form-status ${status.type}`}>{status.message}</p>}

              <button type="submit" className="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
