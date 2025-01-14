
import './Features.scss';
import chatIcon from '../../assets/images/icon-chat.png'; 
import moneyIcon from '../../assets/images/icon-money.png';
import shieldIcon from '../../assets/images/icon-security.png';

const Features = () => {
  return (
    <section className="features">
      <div className="features__item">
        <img src={chatIcon} alt="Chat Icon" className="features__icon" />
        <h3 className="features__title">You are our #1 priority</h3>
        <p className="features__description">
          Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>
      <div className="features__item">
        <img src={moneyIcon} alt="Money Icon" className="features__icon" />
        <h3 className="features__title">More savings means higher rates</h3>
        <p className="features__description">
          The more you save with us, the higher your interest rate will be!
        </p>
      </div>
      <div className="features__item">
        <img src={shieldIcon} alt="Shield Icon" className="features__icon" />
        <h3 className="features__title">Security you can trust</h3>
        <p className="features__description">
          We use top-of-the-line encryption to make sure your data and money are always safe.
        </p>
      </div>
    </section>
  );
};

export default Features;
