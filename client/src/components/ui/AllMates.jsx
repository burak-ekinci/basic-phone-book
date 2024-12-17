import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Spinner, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AllMates = () => {
  const [mates, setMates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMate, setSelectedMate] = useState(null);

  useEffect(() => {
    fetchMates();
  }, []);

  const fetchMates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_KEY_CONNECTION_STRING}/user/mates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMates(response.data.mates);
      setLoading(false);
    } catch (error) {
      console.error("Mates verileri çekilirken hata oluştu:", error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
        toast.error("Giriş yapınız!");
      }
    }
  };

  // Silme işlemi için onay modalını aç
  const handleShowDeleteModal = (mate) => {
    setSelectedMate(mate);
    setShowConfirmModal(true);
  };

  // Silme işlemini gerçekleştir
  const handleDeleteMate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_KEY_CONNECTION_STRING}/user/deleteMateByEmail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { email: selectedMate.email },
        }
      );

      if (response.data.valid) {
        toast.success("Kişi başarıyla silindi");
        setMates(mates.filter((mate) => mate.email !== selectedMate.email));
        setShowConfirmModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Silme işlemi başarısız oldu");
    }
  };

  // Sayfalama için hesaplamalar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMates = mates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mates.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Rehberim</h2>
      <hr />
      {/* Tablo */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>İsim</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Ünvan</th>
            <th>Alan</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {currentMates.map((mate, index) => (
            <tr className="text-center" key={index}>
              <td>{mate.firstName + " " + mate.lastName}</td>
              <td>{mate.email}</td>
              <td>{mate.phoneNumber}</td>
              <td>{mate.title}</td>
              <td>{mate.field}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteModal(mate)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Sayfalama */}
      <nav aria-label="Sayfalama">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Önceki
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Sonraki
            </button>
          </li>
        </ul>
      </nav>

      {/* Silme Onay Modalı */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Silme Onayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>
              {selectedMate?.firstName} {selectedMate?.lastName}
            </strong>{" "}
            kişisini rehberden silmek istediğinize emin misiniz?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            İptal
          </Button>
          <Button variant="danger" onClick={handleDeleteMate}>
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllMates;
