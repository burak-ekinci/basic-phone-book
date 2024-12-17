import React, { useState, useEffect } from "react";
import { Table, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const ListMates = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_KEY_CONNECTION_STRING}/contacts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Kişiler yüklenirken bir hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kişiyi silmek istediğinizden emin misiniz?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(contacts.filter((contact) => contact._id !== id));
      } catch (err) {
        setError(
          err.response?.data?.message || "Kişi silinirken bir hata oluştu"
        );
      }
    }
  };

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Rehber</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        {contacts.length === 0 ? (
          <Alert variant="info">Henüz kayıtlı kişi bulunmuyor.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>E-posta</th>
                <th>Adres</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td>{contact.address}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Sil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListMates;
