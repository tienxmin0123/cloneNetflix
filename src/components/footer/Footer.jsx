import React from "react";
import "../footer/footer.scss";
import background from "../../assets/images/Netflix-bg.jpg";
import logo from "../../assets/images/Netflix_logo.svg";
import { Link } from "react-router-dom";

const dataFooter = [
  {
    id: 1,
    list: ["home", "movies", "tv series"],
  },
  {
    id: 2,
    list: ["live", "FAQ", "Premium", "Pravacy policy"],
  },
  {
    id: 3,
    list: ["Contac us", "Term of services", "About us"],
  },
  {
    id: 4,
    list: ["You must watch", "Term of services", "Top IMDB"],
  },
];

export default function Footer() {
  return (
    <footer className="footer" style={{ background: `url(${background})` }}>
      <div className="footer__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="footer__wrap">
        {dataFooter.map((item) => (
          <div className="footer__link" key={item.id}>
            {item.list.map((x, id) => (
              <Link to={""} className="footer__link-item" key={id}>
                {x}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
