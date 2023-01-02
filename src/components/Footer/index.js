import {VscGithubAlt} from 'react-icons/vsc'
import {FaLinkedin, FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="footer-heading">
      COVID19
      <span className="higlight-india">INDIA</span>
    </h1>
    <p className="footer-description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-container">
      <a
        href="https://github.com/mubashir0356/Covid-19-Dashboard"
        target="_blank"
        rel="noreferrer"
      >
        <VscGithubAlt className="github-icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/abdul-mubashir-fullstack-developer/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin className="instagram-icon" />
      </a>
      <FaTwitter className="twitter-icon" />
    </div>
  </div>
)

export default Footer
