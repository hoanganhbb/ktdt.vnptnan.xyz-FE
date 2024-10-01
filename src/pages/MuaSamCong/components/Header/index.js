/* eslint-disable max-len */
import { Input } from 'antd';
import React from 'react';

function Header() {
  return (
    <header id="egp-header">
      <input type="text" id="server-time" style={{ display: 'none' }} />
      <div id="overlay" onClick="closeNav()" className="overlay-common" />
      <div id="mySidebar" className="sidebar">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-start justify-content-center px-2">
            <p id="live-time-responsive" className="txt-hour" style={{ color: 'rgb(38, 38, 38)' }}></p>
            <p id="live-date-responsive" className="txt-time" style={{ color: 'rgb(38, 38, 38)' }}></p>
          </div>
          <a href="javascript:void(0)" onClick="closeNav()" className="closebtn">
            ×
          </a>
        </div>
        <div id="accordion">
          <div className="card">
            <div id="heading0" className="card-header">
              <h5 className="mb-0">
                <button
                  onClick="location.href = 'https://muasamcong.mpi.gov.vn/web/guest/home'"
                  data-toggle="collapse"
                  data-target="#collapse0"
                  aria-expanded="true"
                  aria-controls="collapse0"
                  className="btn"
                >
                  Trang chủ
                </button>
              </h5>
            </div>
          </div>
          <div className="card">
            <div id="heading1" className="card-header">
              <h5 className="mb-0">
                <button
                  data-toggle="collapse"
                  data-target="#collapse1"
                  aria-expanded="false"
                  aria-controls="collapse1"
                  className="btn collapsed"
                >
                  Tra cứu
                </button>
              </h5>
            </div>
            <div id="collapse1" aria-labelledby="heading1" data-parent="#accordion" className="collapse">
              <div className="card-body">
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/legal-documents', '_self');">
                  Văn bản pháp quy
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/student-list', '_self');">
                  Chứng chỉ đấu thầu cơ bản
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/approved-contractors-list', '_self');">
                  Nhà thầu được phê duyệt
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/investor-approved-list', '_self');">
                  Nhà đầu tư được phê duyệt
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/foreign-contractor-winning-bid-vn', '_self');">
                  Nhà thầu nước ngoài trúng thầu tại Việt Nam
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/organizations-violators', '_self');">
                  Tổ chức, cá nhân vi phạm
                </a>
                <a
                  href="http://cchn.mpi.gov.vn/danh-sach-ca-nhan-duoc-cap-chung-chi-hanh-nghe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chứng chỉ hành nghề
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/annual-tender-form', '_self');">
                  Biểu mẫu công tác đấu thầu hàng năm
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/bid-solicitor-approval', '_self');">
                  Bên mời thầu được phê duyệt
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/investors-approval-v2', '_self');">
                  Danh sách chủ đầu tư được phê duyệt
                </a>
              </div>
            </div>
          </div>
          <div className="card">
            <div id="heading2" className="card-header">
              <h5 className="mb-0">
                <button
                  onClick="location.href = 'https://muasamcong.mpi.gov.vn/web/guest/frequently-asked-questions'"
                  data-toggle="collapse"
                  data-target="#collapse2"
                  aria-expanded="true"
                  aria-controls="collapse2"
                  className="btn"
                >
                  Câu hỏi thường gặp
                </button>
              </h5>
            </div>
          </div>
          <div className="card">
            <div id="heading3" className="card-header">
              <h5 className="mb-0">
                <button
                  data-toggle="collapse"
                  data-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                  className="btn collapsed"
                >
                  Hướng dẫn sử dụng
                </button>
              </h5>
            </div>
            <div id="collapse3" aria-labelledby="heading3" data-parent="#accordion" className="collapse">
              <div className="card-body">
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-contractors', '_self');">
                  Nhà thầu
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-investor-bid-solicitor', '_self');">
                  Bên mời thầu/ Chủ đầu tư
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-bid-solicitor-investor', '_self');">
                  Bên mời thầu LCNĐT
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-manual-investors', '_self');">
                  Nhà đầu tư
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-competent-authority', '_self');">
                  Cơ quan có thẩm quyền
                </a>
                <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/tender-management-unit', '_self');">
                  Đơn vị quản lý đấu thầu
                </a>
              </div>
            </div>
          </div>
          <div className="card">
            <div id="heading4" className="card-header">
              <h5 className="mb-0">
                <button
                  onClick="location.href = 'https://muasamcong.mpi.gov.vn/web/guest/procurement-agreement'"
                  data-toggle="collapse"
                  data-target="#collapse4"
                  aria-expanded="true"
                  aria-controls="collapse4"
                  className="btn"
                >
                  Mua sắm công theo hiệp định
                </button>
              </h5>
            </div>
          </div>
        </div>
        <div className="bottom-right-btn__wrapper">
          <a href="#" className="nav-link bottom-right-btn px-0 text-center">
            <p>
              Đăng ký
              <img
                src="https://muasamcong.mpi.gov.vn/o/egp-portal-theme/images/icons/down-arrow.svg"
                alt="down-arrow"
                className="dropdown-img"
              />
            </p>
          </a>
          <a
            href="https://muasamcong.mpi.gov.vn/c/portal/login?p_l_id=141451"
            className="nav-link bottom-right-btn text-center active bg-brown px-0"
          >
            <p>Đăng nhập</p>
          </a>
        </div>
      </div>
      <button onClick="openNav()" className="openbtn">
        ☰
      </button>
      <div className="border-main">
        <div className="content__wrapper p-0">
          <div className="content mt-0">
            <div className="header-bg">
              <div className="header-content">
                <div className="header-content__left-header">
                  <img
                    src="https://brademar.com/wp-content/uploads/2022/09/VNPT-Logo-PNG-3.png"
                    alt="small-header"
                    className="img"
                  />
                  <div className="header-content__title-left-header">
                    <p className="header-content__title-left-header__bottom-content">VNPT Nghệ An</p>
                    <p className="header-content__title-left-header__top-content">Hệ thống mạng đấu thầu quốc gia</p>
                  </div>
                </div>
                <div className="header-content__right-header">
                  <div className="row">
                    <button
                      type="button"
                      className="btn-change-display"
                      style={{ marginRight: 15, padding: 8, borderRadius: 10 }}
                    >
                      <img
                        src="https://muasamcong.mpi.gov.vn/o/egp-portal-theme/images/icons/phone.png"
                        alt="recycle"
                      />
                      <span style={{ fontSize: 15 }}>Tổng đài hỗ trợ: 0944229230</span>
                    </button>
                    <button
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="btn-change-language"
                    >
                      <img
                        src="https://muasamcong.mpi.gov.vn/o/egp-portal-theme/images/icons/vn_icon.png"
                        alt="icon_vn"
                        style={{ paddingRight: 8 }}
                      />
                      Tiếng Việt
                      <img
                        src="https://muasamcong.mpi.gov.vn/o/egp-portal-theme/images/icons/down-arrow.svg"
                        alt="down-arrow"
                        style={{ width: 12, height: 'auto' }}
                      />
                    </button>
                    <div aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                      <a className="dropdown-item">English</a>
                      <a className="dropdown-item">Tiếng Việt</a>
                    </div>
                  </div>
                  <div className="header-content__title-right-header">
                    <a
                      href="#"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="btn-change-language"
                    >
                      Giới thiệu
                      <img
                        src="https://muasamcong.mpi.gov.vn/o/egp-portal-theme/images/icons/down-arrow.svg"
                        alt="down-arrow"
                        style={{ width: 8, height: 'auto' }}
                      />
                    </a>
                    <div aria-labelledby="dropdownMenuButton" className="dropdown-menu introduce-dropdown">
                      <a
                        onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/introduce-department', '_self');"
                        className="dropdown-item"
                      >
                        Cục quản lý đầu thầu
                      </a>
                      <a
                        onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/introduce-center', '_self');"
                        className="dropdown-item"
                      >
                        Trung tâm đấu thầu qua mạng quốc gia
                      </a>
                      <a
                        onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/introduce-idnes', '_self');"
                        className="dropdown-item"
                      >
                        Doanh nghiệp dự án IDNES
                      </a>
                      <a
                        onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/introduce-system', '_self');"
                        className="dropdown-item"
                      >
                        Hệ thống mạng đấu thầu quốc gia
                      </a>
                    </div>
                    <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/news', '_self');">Tin tức</a>
                    <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/notification-system', '_self');">
                      Thông báo của Bộ
                    </a>
                    <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/contact', '_self');">Liên hệ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="egp-navigation" className="bg-nav">
          <div className="content__wrapper p-0">
            <div className="content mt-0">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className={`nav-link active-nav`}
                      >
                        Tìm kiếm gói thầu
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link">
                        Tra cứu
                      </a>
                      <div className="dropdown-content">
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/legal-documents', '_self');">
                          Tra cứu nhà thầu
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/student-list', '_self');">
                          Tra cứu bên mời thầu
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/approved-contractors-list', '_self');">
                          Nhà thầu được phê duyệt
                        </a>
                        {/* <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/investor-approved-list', '_self');">
                          Nhà đầu tư được phê duyệt
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/foreign-contractor-winning-bid-vn', '_self');">
                          Nhà thầu nước ngoài trúng thầu tại Việt Nam
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/organizations-violators', '_self');">
                          Tổ chức, cá nhân vi phạm
                        </a> */}
                        {/* <a
                          href="http://cchn.mpi.gov.vn/danh-sach-ca-nhan-duoc-cap-chung-chi-hanh-nghe"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Chứng chỉ hành nghề
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/annual-tender-form', '_self');">
                          Biểu mẫu công tác đấu thầu hàng năm
                        </a> */}
                        <a onClick={() => window.open('https://muasamcong.mpi.gov.vn/web/guest/bid-solicitor-approval', '_self')}>
                          Bên mời thầu được phê duyệt
                        </a>
                        <a onClick={() => window.open('https://muasamcong.mpi.gov.vn/web/guest/investors-approval-v2', '_self')}>
                          Danh sách chủ đầu tư được phê duyệt
                        </a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/frequently-asked-questions', '_self');"
                        className="nav-link"
                      >
                        Câu hỏi thường gặp
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link">
                        Hướng dẫn sử dụng
                      </a>
                      <div className="dropdown-content">
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-contractors', '_self');">
                          Nhà thầu
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-investor-bid-solicitor', '_self');">
                          Bên mời thầu/ Chủ đầu tư
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-bid-solicitor-investor', '_self');">
                          Bên mời thầu LCNĐT
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-manual-investors', '_self');">
                          Nhà đầu tư
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/guideline-competent-authority', '_self');">
                          Cơ quan có thẩm quyền
                        </a>
                        <a onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/tender-management-unit', '_self');">
                          Đơn vị quản lý đấu thầu
                        </a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        // onClick="window.open('https://muasamcong.mpi.gov.vn/web/guest/procurement-agreement', '_self');"
                        style={{ lineHeight: '48px' }}
                      >
                        <Input placeholder='Tìm kiếm theo mã thông báo mời thầu' style={{ width: 300 }} />
                      </a>
                    </li>
                  </ul>
                  <div className="collapse navbar-collapse bottom-right-content px-0">
                    <div className="bottom-right-txt">
                      <p id="live-time" className="txt-hour"></p>
                      <p id="live-date" className="txt-time"></p>
                    </div>
                    <div className="bottom-right-btn__wrapper">
                      <a
                        href="#"
                        type="button"
                        id="dropdownRegisterButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="nav-link bottom-right-btn px-0 text-center"
                      >
                        Đăng ký
                        <img
                          src="https://muasamcong.mpi.gov.vn/o/egp-portal-theme/images/icons/down-arrow.svg"
                          alt="down-arrow"
                          className="dropdown-img"
                        />
                      </a>
                      <div aria-labelledby="dropdownRegisterButton" className="dropdown-menu register-dropdown">
                        <a
                          onClick="window.open('https://muasamcong.mpi.gov.vn/egp/usermntfe/register')"
                          className="dropdown-item"
                        >
                          Đăng ký tổ chức trong nước
                        </a>
                        <a
                          onClick="window.open('https://muasamcong.mpi.gov.vn/egp/usermntfe/register/foreign')"
                          className="dropdown-item"
                        >
                          Đăng ký nhà thầu, nhà đầu tư nước ngoài
                        </a>
                        <a
                          onClick="window.open('https://muasamcong.mpi.gov.vn/egp/usermntfe/lookup-register')"
                          className="dropdown-item"
                        >
                          Tra cứu thông tin đăng ký
                        </a>
                      </div>
                      <a
                        data-redirect="false"
                        href="https://muasamcong.mpi.gov.vn/c/portal/login?p_l_id=141451"
                        className="nav-link bottom-right-btn text-center active bg-brown px-0"
                      >
                        <p>Đăng nhập</p>
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
