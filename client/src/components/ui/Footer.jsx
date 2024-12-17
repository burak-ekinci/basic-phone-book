import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const navigate = useNavigate();

  // Kullanıcı durumunu kontrol et
  const checkAuthAndNavigate = (path) => {
    const user = (() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch {
        return null;
      }
    })();

    if (!user) {
      toast.warning("Bu sayfaya erişmek için giriş yapmalısınız");
      navigate("/login");
      return;
    }

    navigate(path);
  };

  return (
    <footer
      className="bg-dark text-light py-5"
      style={{ position: "relative", bottom: 0, width: "100%" }}
    >
      <Container>
        <Row className="g-4">
          {/* Logo ve Açıklama */}
          <Col md={4}>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-reception-4 me-2 fs-4"></i>
              <h5 className="mb-0">CallMate</h5>
            </div>
            <p className="">
              Modern ve kullanıcı dostu rehber uygulaması ile tüm
              bağlantılarınızı güvenle saklayın ve yönetin.
            </p>
          </Col>

          {/* Hızlı Erişim */}
          <Col md={3}>
            <h5 className="mb-3">Hızlı Erişim</h5>
            <ul className="list-unstyled text-light">
              <li>
                <a
                  onClick={() => checkAuthAndNavigate("/all-mates")}
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-chevron-right me-1"></i> Tüm Kişiler
                </a>
              </li>
              <li>
                <a
                  onClick={() => checkAuthAndNavigate("/add-mates")}
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-chevron-right me-1"></i> Kişi Ekle
                </a>
              </li>
              <li>
                <a
                  onClick={() => checkAuthAndNavigate("/search-mates")}
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-chevron-right me-1"></i> Kişi Ara
                </a>
              </li>
              <li>
                <a
                  onClick={() => checkAuthAndNavigate("/settings")}
                  className="text-decoration-none "
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-chevron-right me-1"></i> Ayarlar
                </a>
              </li>
            </ul>
          </Col>

          {/* İletişim */}
          <Col md={3}>
            <h5 className="mb-3">İletişim</h5>
            <ul className="list-unstyled">
              <li className="">
                <i className="bi bi-geo-alt me-2"></i> İstanbul, Türkiye
              </li>
              <li className="">
                <i className="bi bi-envelope me-2"></i> info@callmate.com
              </li>
              <li className="">
                <i className="bi bi-telephone me-2"></i> +90 555 123 4567
              </li>
            </ul>
          </Col>

          {/* Sosyal Medya */}
          <Col md={2}>
            <h5 className="mb-3">Sosyal Medya</h5>
            <div className="d-flex gap-3">
              <a
                href="#"
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="#"
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="#"
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                href="#"
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Alt Bilgi */}
        <Row className="mt-5">
          <Col>
            <hr className="border-secondary" />
            <p className="text-center mb-0">
              © {new Date().getFullYear()} CallMate. Tüm hakları saklıdır.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
