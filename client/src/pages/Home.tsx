// src/pages/Home.tsx
import React from "react";
import "./Home.scss";
import CareerVisionLogo from "../assets/images/CareerVisionLogo.png"; // client/src/assets/images/CareerVisionLogo.png

const RobotIcon: React.FC<{
  size?: number;
  rotate?: number;
  variant?: "solid" | "outlined" | "love";
  className?: string;
  shadow?: boolean;
}> = ({
  size = 130,
  rotate = 0,
  variant = "solid",
  className = "",
  shadow = true,
}) => {
  const stroke = "#000000";
  const fill = "#888888";

  return (
    <svg
      className={`robot ${className} ${shadow ? "robot--shadow" : ""}`}
      width={size}
      height={size}
      viewBox="0 0 256 256"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <defs>
        <filter id="rshadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="-10"
            dy="5"
            stdDeviation="12"
            floodColor="rgba(0,0,0,0.25)"
          />
        </filter>
        <clipPath id="roundedHead">
          <rect x="16" y="56" width="224" height="160" rx="48" ry="48" />
        </clipPath>
        <path
          id="heart"
          d="M12 22C12 15 7 12 4 12C1 12 0 14 0 16C0 21 7 26 12 30C17 26 24 21 24 16C24 14 23 12 20 12C17 12 12 15 12 22Z"
        />
      </defs>

      {/* Antenna */}
      <line
        x1="128"
        y1="24"
        x2="128"
        y2="48"
        stroke={stroke}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="128" cy="16" r="12" fill={fill} stroke={stroke} strokeWidth="6" />

      {/* Ears */}
      <rect
        x="4"
        y="110"
        width="28"
        height="60"
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="6"
      />
      <rect
        x="224"
        y="110"
        width="28"
        height="60"
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="6"
      />

      {/* Head */}
      <g filter="url(#rshadow)">
        <rect x="16" y="56" width="224" height="160" rx="48" ry="48" fill={fill} />
        <rect
          x="16"
          y="56"
          width="224"
          height="160"
          rx="48"
          ry="48"
          fill="none"
          stroke={stroke}
          strokeWidth="0"
        />
      </g>

      {/* Eyes */}
      {variant === "love" ? (
        <g transform="translate(72,112) scale(2)">
          <use href="#heart" fill="#FFFFFF" />
          <g transform="translate(28,0)">
            <use href="#heart" fill="#FFFFFF" />
          </g>
        </g>
      ) : variant === "outlined" ? (
        <>
          <circle cx="96" cy="136" r="16" fill="#FFFFFF" stroke={stroke} strokeWidth="8" />
          <circle cx="160" cy="136" r="16" fill="#FFFFFF" stroke={stroke} strokeWidth="8" />
        </>
      ) : (
        <>
          <circle cx="96" cy="136" r="18" fill="#FFFFFF" />
          <circle cx="160" cy="136" r="18" fill="#FFFFFF" />
        </>
      )}
    </svg>
  );
};

/** PNG logo component (from client/src/assets/images/CareerVisionLogo.png) */
const LogoCV: React.FC<{ width?: number }> = ({ width = 150 }) => (
  <img
    src={CareerVisionLogo}
    alt="Career Vision logo"
    width={width}
    className="cv-logo"
  />
);

const Home: React.FC = () => {
  return (
    <main className="cv">
      {/* HEADER */}
      <header className="cv__header">
        <div className="cv__headerInner">
          <div className="cv__logo">
            <LogoCV />
          </div>
          <nav className="cv__nav" aria-label="Main">
            <a href="#about">About</a>
            <a href="#expert">Call an Expert</a>
            <a href="#community">TCP Community</a>
            <a href="#memberships">Memberships</a>
          </nav>
          <a className="cv__loginBtn" href="#login" role="button">
            Login
          </a>
        </div>
      </header>

      {/* PAGE SECTIONS WRAP */}
      <div className="cv__sections">
        {/* HERO */}
        <section className="cv__hero">
          <div className="cv__heroInner">
            <div className="cv__heroText">
              <div className="skel skel--lg w-80" />
              <div className="skel skel--lg w-60" />
              <div className="skel w-90" />
              <div className="skel w-85" />
              <div className="skel w-50" />
            </div>

            <div className="cv__heroImage">
              <div className="imgPlaceholder imgPlaceholder--square" aria-hidden>
                <span className="xline xline--a" />
                <span className="xline xline--b" />
              </div>
            </div>
          </div>

          <button className="cv__cta" type="button">
            Call To Action Bttn
          </button>
        </section>

        {/* INFO 1 */}
        <section className="cv__info">
          <div className="cv__card">
            <RobotIcon className="cv__robot cv__robot--topCenter" size={130} />
            <div className="cv__cardInner">
              <div className="cv__cardText">
                <div className="skel skel--title w-70" />
                <div className="skel skel--title w-40" />
                <div className="skel w-80" />
                <div className="skel w-82" />
                <div className="skel w-76" />
                <div className="skel w-44" />
              </div>
              <div className="cv__cardMedia">
                <div className="imgPlaceholder imgPlaceholder--round" aria-hidden>
                  <span className="xline xline--a" />
                  <span className="xline xline--b" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INFO 2 (robot tilted left) */}
        <section className="cv__info">
          <div className="cv__card">
            <RobotIcon
              className="cv__robot cv__robot--topLeft"
              size={130}
              rotate={-45}
            />
            <div className="cv__cardInner">
              <div className="cv__cardText">
                <div className="skel skel--title w-70" />
                <div className="skel skel--title w-40" />
                <div className="skel w-80" />
                <div className="skel w-82" />
                <div className="skel w-76" />
                <div className="skel w-44" />
              </div>
              <div className="cv__cardMedia">
                <div className="imgPlaceholder imgPlaceholder--round" aria-hidden>
                  <span className="xline xline--a" />
                  <span className="xline xline--b" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INFO 3 (robots left & right) */}
        <section className="cv__info">
          <div className="cv__card">
            <RobotIcon
              className="cv__robot cv__robot--midLeft"
              size={110}
              rotate={-90}
            />
            <RobotIcon
              className="cv__robot cv__robot--midRight"
              size={110}
              rotate={90}
            />
            <div className="cv__cardInner">
              <div className="cv__cardText">
                <div className="skel skel--title w-70" />
                <div className="skel skel--title w-40" />
                <div className="skel w-80" />
                <div className="skel w-82" />
                <div className="skel w-76" />
                <div className="skel w-44" />
              </div>
              <div className="cv__cardMedia">
                <div className="imgPlaceholder imgPlaceholder--round" aria-hidden>
                  <span className="xline xline--a" />
                  <span className="xline xline--b" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="cv__ctaStrip">
          <div className="cv__ctaText">
            <div className="skel skel--xl w-55" />
            <div className="skel skel--lg w-35 center" />
          </div>

          <button className="cv__cta cv__cta--center" type="button">
            Call To Action Bttn
          </button>

          {/* Bottom Robot Icon Group — rectangles per Figma spec */}
          <div className="cv__robotRow" aria-hidden>
            <div className="cv__robotBox">
              <span className="cv__robotFill" />
            </div>
            <div className="cv__robotBox">
              <span className="cv__robotFill" />
            </div>
            <div className="cv__robotBox">
              <span className="cv__robotFill" />
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="cv__footer" role="contentinfo">
        <div className="cv__footerInner">
          <div className="cv__footerBrand">
            <LogoCV width={270} />
            <div className="cv__socials" aria-label="Social links">
              <a className="ico" aria-label="X">
                <span className="dot" />
              </a>
              <a className="ico" aria-label="Instagram">
                <span className="dot" />
              </a>
              <a className="ico" aria-label="Facebook">
                <span className="dot" />
              </a>
              <a className="ico" aria-label="YouTube">
                <span className="dot" />
              </a>
              <a className="ico" aria-label="TikTok">
                <span className="dot" />
              </a>
            </div>
          </div>

          <div className="cv__footerLinks">
            <div className="col">
              <h6>Product</h6>
              <a>Sign Up</a>
              <a>Call an Expert</a>
              <a>Memberships</a>
            </div>
            <div className="col">
              <h6>Company</h6>
              <a>About</a>
              <a>TCP Community</a>
              <a>Sponsors</a>
              <a>Team CV</a>
            </div>
            <div className="col">
              <h6>Resources</h6>
              <a>FAQ</a>
              <a>Blog</a>
            </div>
            <div className="col">
              <h6>Policies</h6>
              <a>Terms of Use</a>
              <a>Privacy</a>
              <a>Licensing</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
