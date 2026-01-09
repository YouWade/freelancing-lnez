import { Images } from '@assets';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__company">時尚風格服飾有限公司</h3>
            <div className="footer__info">
              <p className="footer__text">地址：台北市中山區民權東路三段123號10樓</p>
              <p className="footer__text">電話：02-1234-5678</p>
              <p className="footer__text">Email：contact@fashionstyle.com.tw</p>
            </div>
          </div>

          <div className="footer__section">
            <div className="footer__info">
              <p className="footer__text">營業時間：週一至週五 10:00 - 19:00</p>
              <p className="footer__text">網站：www.fashionstyle.com.tw</p>
              <p className="footer__text">客服專線：0800-123-456</p>
            </div>
          </div>

          <div className="footer__section">
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <img src={Images.youtubeIcon} alt="YouTube" />
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <img src={Images.facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <img src={Images.twitterIcon} alt="Twitter" />
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <img src={Images.instagramIcon} alt="Instagram" />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <img src={Images.linkedinIcon} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">CompanyName @ 202X. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
