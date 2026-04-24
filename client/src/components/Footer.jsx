import portfolioData from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Hamday Rabby Hossain</div>
          <div className="footer-links">
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={personal.codeforces} target="_blank" rel="noopener noreferrer">
              Codeforces
            </a>
            <a href={personal.leetcode} target="_blank" rel="noopener noreferrer">
              LeetCode
            </a>
            <a href={`mailto:${personal.email}`}>Email</a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} {personal.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
