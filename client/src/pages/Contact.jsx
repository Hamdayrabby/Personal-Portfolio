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
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check - silently drop bot submissions
    if (form.honeypot) {
      setStatus({
        type: 'success',
        message: `Sent. I'll reply within ${profile.responseTime}.`,
      });
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
          message: `Sent. I'll reply within ${profile.responseTime}.`,
        });
        setForm({ name: '', email: '', message: '', honeypot: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus({
          type: 'error',
          message: `Sending failed — please reach out to ${profile.email} directly.`,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          {/* Capped font-size to fit in 3 lines max at 1440px per spec §5.5 */}
          <h1
            className="lede"
            style={{
              marginTop: '1.25rem',
              maxWidth: '30ch',
              fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
              lineHeight: 1.25,
            }}
          >
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
                <dd style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href={`mailto:${profile.email}`} className="link">
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="tag"
                    aria-label="Copy email address"
                    style={{
                      cursor: 'pointer',
                      background: copied ? 'var(--accent)' : 'var(--surface)',
                      color: copied ? '#121212' : 'var(--text)',
                      fontWeight: copied ? '700' : '400',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </dd>
              </div>

              <div className="contact-item">
                <dt>Location & Timezone</dt>
                <dd>
                  {profile.location}{' '}
                  <span style={{ color: 'var(--text-muted)' }}>(UTC+6)</span>
                </dd>
              </div>

              <div className="contact-item">
                <dt>Availability</dt>
                <dd>{profile.availability}</dd>
              </div>

              <div className="contact-item">
                <dt>Research Openness</dt>
                <dd style={{ color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>
                  Also open to research collaboration and PhD opportunities.
                </dd>
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
                    LinkedIn ↗
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={profile.codeforces}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Codeforces ↗
                  </a>
                  <a
                    href={profile.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    LeetCode ↗
                  </a>
                </dd>
              </div>
            </dl>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Spam honeypot hidden field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="honeypot">Leave this field blank</label>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  tabIndex="-1"
                  value={form.honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-name">
                  Name <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p style={{ color: 'var(--status-err)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-email">
                  Email <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p style={{ color: 'var(--status-err)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-message">
                  Message <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  required
                  placeholder="What are you building?"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <p style={{ color: 'var(--status-err)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="pixel-btn"
                disabled={loading}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? 'Sending...' : 'Send message'}
              </button>

              {status && (
                <div
                  className={`form-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}
                  role="status"
                  style={{
                    marginTop: '1.25rem',
                    padding: '1rem',
                    border: `1px solid ${status.type === 'error' ? 'var(--status-err)' : 'var(--accent)'}`,
                    borderRadius: 'var(--radius)',
                    background: 'var(--surface)',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 'var(--step-0)' }}>{status.message}</p>
                  {status.type === 'error' && (
                    <p style={{ marginTop: '0.5rem', fontSize: 'var(--step--1)' }}>
                      <a href={`mailto:${profile.email}`} className="arrow-link">
                        Open email client directly <span className="arrow">→</span>
                      </a>
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
