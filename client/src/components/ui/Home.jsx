import React from "react";

const Home = () => {
  return (
    <div className="container py-5">
      {/* <!-- Hero Section --> */}
      <div className="row align-items-center text-center text-md-start">
        <div className="col-md-6">
          <h1 className="display-12 fw-bold mb-3">Bağlantınızı Güçlendirin!</h1>
          <p className="lead">
            CallMate, iletişim rehberinizi kolayca yönetmenizi ve organize
            etmenizi sağlayan modern bir uygulamadır.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <i
            className="bi bi-telephone-fill text-primary"
            style={{ fontSize: "5rem" }}
          ></i>
        </div>
      </div>

      {/* <!-- Özellikler --> */}
      <div className="row text-center my-5">
        <div className="col-md-4">
          <div className="bg-light p-4 rounded shadow-sm">
            <i className="bi bi-person-lines-fill text-primary fs-1 mb-3"></i>
            <h3 className="h5">Kolay Organizasyon</h3>
            <p>Kişilerinizi kolayca ekleyin, düzenleyin ve kategorize edin.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light p-4 rounded shadow-sm">
            <i className="bi bi-cloud-fill text-primary fs-1 mb-3"></i>
            <h3 className="h5">Güvenli Depolama</h3>
            <p>
              Tüm verileriniz güvenli bir şekilde bulut sisteminde saklanır.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light p-4 rounded shadow-sm">
            <i className="bi bi-globe text-primary fs-1 mb-3"></i>
            <h3 className="h5">Kolay Erişim</h3>
            <p>İstediğiniz yerden kişilerinize anında erişin.</p>
          </div>
        </div>
      </div>

      {/* <!-- Nasıl Çalışır --> */}
      <div className="bg-light p-5 rounded shadow-sm my-5">
        <h2 className="text-center fw-bold mb-4">Nasıl Çalışır?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="h1 text-primary">1</div>
            <h4 className="h6">Hesap Oluşturun</h4>
            <p>Hızlı ve ücretsiz kayıt olun.</p>
          </div>
          <div className="col-md-4">
            <div className="h1 text-primary">2</div>
            <h4 className="h6">Kişileri Ekleyin</h4>
            <p>Rehberinizi oluşturmaya başlayın.</p>
          </div>
          <div className="col-md-4">
            <div className="h1 text-primary">3</div>
            <h4 className="h6">Yönetin</h4>
            <p>Kişilerinizi kolayca düzenleyin.</p>
          </div>
        </div>
      </div>

      {/* <!-- CTA Section --> */}
      <div className="text-center">
        <h2 className="fw-bold me-5">Hemen Başlayın</h2>
        <p className="mb-4">
          Ücretsiz hesap oluşturun ve kişilerinizi yönetmeye başlayın.
        </p>
        <a href="/register" className="btn btn-danger btn-lg ">
          Kayıt Ol
        </a>
      </div>
    </div>
  );
};

export default Home;
