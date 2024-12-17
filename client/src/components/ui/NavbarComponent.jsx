import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  // User bilgisini güvenli bir şekilde al
  const getUserFromStorage = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("User parse error:", error);
      // Hata durumunda localStorage'ı temizle
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  };

  const user = getUserFromStorage();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Sol taraf - Logo ve Marka */}

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <i className="bi bi-reception-4 me-2 text-success"></i>
            <span className="fw-bold">CallMate</span>
          </Navbar.Brand>
          {user ? (
            <>
              {/* Orta kısım - Navigasyon Linkleri */}
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/all-mates" className="mx-2">
                  All Mates
                </Nav.Link>
                <Nav.Link as={Link} to="/add-mates" className="mx-2">
                  Add Mates
                </Nav.Link>
                <Nav.Link as={Link} to="/search-mates" className="mx-2">
                  Search Mates
                </Nav.Link>
              </Nav>

              {/* Sağ taraf - Profil */}
              <Nav>
                <NavDropdown
                  title={
                    <div className="d-inline-flex align-items-center">
                      <i className="bi bi-person-gear me-2"></i>
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  }
                  id="profile-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/settings">
                    Ayarlar
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Çıkış Yap
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            /* Sağ taraf - Giriş Yap */
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/login"
                className="btn btn-outline-light ms-2"
              >
                Giriş Yap
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
