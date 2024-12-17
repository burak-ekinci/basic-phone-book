import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AddMates = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    title: "",
    field: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Zorunlu alanları kontrol et
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phoneNumber
      ) {
        toast.error("Lütfen zorunlu alanları doldurun!");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_KEY_CONNECTION_STRING}/user/addMate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.valid) {
        toast.success("Kişi başarıyla eklendi");
        // Formu temizle
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          title: "",
          field: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Kişi eklenirken bir hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Yeni Kişi Ekle</h2>
      <hr />
      <Container className="my-4">
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Ad <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Kişinin adını girin"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Soyad <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Kişinin soyadını girin"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  E-posta <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ornek@email.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Telefon Numarası <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="+90 555 123 4567"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ünvan</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Örn: Yazılım Mühendisi"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Alan</Form.Label>
                <Form.Control
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  placeholder="Örn: Bilişim Teknolojileri"
                />
              </Form.Group>

              <Button className="w-100" type="submit" disabled={loading}>
                {loading ? "Ekleniyor..." : "Kişi Ekle"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddMates;
