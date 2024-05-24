import Navigation from "./pages/NavBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import SubmitClaim from "./pages/SubmitClaim";
import GetClaimStatus from "./pages/GetClaimStatus";
import { AuthProvider } from "@asgardeo/auth-react";

function App() {
  return (
    <div className="App">
      <AuthProvider config={window.configs.asgardeoConfig} >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/submitClaim" element={<SubmitClaim />} ></Route>
            <Route path="/getClaimStatus" element={<GetClaimStatus />} ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}


export default App;
