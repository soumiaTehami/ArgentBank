
import './Banner.scss';
import bannerImage from '../assets/images/bank-tree.webp'; 

const Banner = () => {
    return (
        <div className="banner">
          <img src={bannerImage} alt="Banner" className="banner__image" />
          <div className="banner__content">
            <h2 className="banner__title">No fees.<br />No minimum deposit.<br />High interest rates.</h2>
            <p className="banner__description">
              Open a savings account with <br />Argent Bank today!
            </p>
          </div>
        </div>
    )
};

export default Banner;
