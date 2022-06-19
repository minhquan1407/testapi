import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./components/Header.jsx";
import TutorialTable from "./components/TutorialTable";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <TutorialTable />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}

export default App;
