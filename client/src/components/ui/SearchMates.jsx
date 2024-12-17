import React, { useState } from "react";
import {
  Form,
  Card,
  Table,
  Alert,
  InputGroup,
  Container,
} from "react-bootstrap";
import axios from "axios";

const SearchMates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce fonksiyonu
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  // API'den arama sonuçlarını getir
  const searchContacts = async (term) => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_KEY_CONNECTION_STRING}/user/searchMates`,
        { searchTerm: term },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data", response.data);

      if (response.data.valid) {
        setSearchResults(response.data.mates);
      } else {
        setError(response.data.message);
        setSearchResults([]);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Arama yapılırken bir hata oluştu"
      );
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce edilmiş arama fonksiyonu
  const debouncedSearch = debounce(searchContacts, 500);

  // Input değişikliğini handle et
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Kişi Ara</h2>
      <hr />
      <Container className="my-4">
        <Card>
          <Card.Body>
            <Form className="mb-4">
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="İsim, telefon, email veya ünvan ile ara..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Yükleniyor...</span>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Ad</th>
                    <th>Soyad</th>
                    <th>Telefon</th>
                    <th>E-posta</th>
                    <th>Ünvan</th>
                    <th>Alan</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((mate, index) => (
                    <tr key={index}>
                      <td>{mate.firstName}</td>
                      <td>{mate.lastName}</td>
                      <td>{mate.phoneNumber}</td>
                      <td>{mate.email}</td>
                      <td>{mate.title}</td>
                      <td>{mate.field}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : searchTerm && !loading ? (
              <Alert variant="info">Arama sonucu bulunamadı.</Alert>
            ) : null}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SearchMates;
