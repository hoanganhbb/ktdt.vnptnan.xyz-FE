// import './styles/main.css';
// import './styles/style.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { Helmet } from 'react-helmet';
// import MainLayout from '../../components/MainLayout';
// import KeywordsManagement from './components/KeywordsManagement';

function MuaSamCongPage() {
  return (
    <>
      <Helmet>
        <title>VNPT | Mua sắm công</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossOrigin="anonymous"
        ></link>
      </Helmet>
      <Header></Header>
      <div style={{ padding: 16 }}>
        <HomePage></HomePage>
      </div>
      {/* <KeywordsManagement></KeywordsManagement> */}
    </ >
  );
}

export default MuaSamCongPage;
