import React from 'react';
import ExpandableMenuItem from './ExpandableMenuItem';
import { checkIsMobile } from './WindowDimensionsProvider';

import styles from './Footer.module.css';

const Footer: React.FunctionComponent = () => {
  const isMobile = checkIsMobile();

  const handleGoToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isMobile) {
    return (
      <div className={styles.footerContainerMobile}>
        <div className={styles.footerNavUpContainer}>
          <div
            className={`${styles.navigateUp} clickable`}
            onClick={handleGoToTop}
          >
            <img src="/static/icons/arrowUp.svg" />
            <span className="font-family-apercu-medium">BACK TO TOP</span>
          </div>
        </div>
        <footer>
          <div className={styles.contentContainerMobile}>
            <hr />
            <ExpandableMenuItem title="Contact" size="large">
              <p>Phone</p>
              <p>Email</p>
              <p>Map</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="Social" size="large">
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Facebook</p>
              <p>Pinterest</p>
              <p>Tumblr</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="Support" size="large">
              <p>Contact</p>
              <p>Help</p>
              <p>Shipping</p>
              <p>Returns &amp; Exchanges</p>
              <p>International</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="Info" size="large">
              <p>About</p>
              <p>Donations</p>
              <p>Friends</p>
              <p>Purchase</p>
            </ExpandableMenuItem>
            <hr />
            <div
              className={`${styles.newsLetterMobile} clickable font-family-apercu-medium`}
            >
              <p>Join the Newsletter</p>
            </div>
          </div>
          <div className={`${styles.bottomBarContainer} background-color-ink`}>
            <div className={styles.bottomBarInnerContainerMobile}>
              <p>{new Date().getFullYear()} Selects — All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerNavUpContainer}>
        <div
          className={`${styles.navigateUp} clickable`}
          onClick={handleGoToTop}
        >
          <img src="/static/icons/arrowUp.svg" />
          <span className="font-family-apercu-medium">BACK TO TOP</span>
        </div>
      </div>
      <footer>
        <div className={`${styles.contentContainer} background-color-paper`}>
          <div className="grid-desktop-layout-expandable max-width-2000">
            <div className={`${styles.linkListContainer} col-span-2-offset-1`}>
              <span>SELECTS PHOTO SUPPLY</span>
              <p>Phone</p>
              <p>Email</p>
              <p>Map</p>
            </div>
            <div className={`${styles.linkListContainer} col-span-2`}>
              <span>SOCIAL</span>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Facebook</p>
              <p>Pinterest</p>
              <p>Tumblr</p>
            </div>
            <div className={`${styles.linkListContainer} col-span-2`}>
              <span>SUPPORT</span>
              <p>Contact</p>
              <p>Help</p>
              <p>Shipping</p>
              <p>Returns &amp; Exchanges</p>
              <p>International</p>
            </div>
            <div className={`${styles.linkListContainer} col-span-2`}>
              <span>INFO</span>
              <p>About</p>
              <p>Donations</p>
              <p>Friends</p>
              <p>Purchase</p>
            </div>
            <div className="col-span-2">
              <div
                className={`${styles.newsLetter} clickable font-family-apercu-medium`}
              >
                <p>News Via Letter</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.bottomBarContainer} background-color-ink`}>
          <div className="grid-desktop-layout-expandable max-width-2000">
            <div className="col-span-10-offset-1">
              <div className={styles.bottomBarInnerContainer}>
                <p>{new Date().getFullYear()} Selects — All Rights Reserved</p>
                <p className="clickable">Terms of Use</p>
                <p className="clickable">Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
