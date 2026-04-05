import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <Router>
      <Layout>
        <Header />

        <Layout.Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Layout.Content>

        <Footer />

        {/* ВОТ СЮДА */}
        <WhatsAppButton />
      </Layout>
    </Router>
  );
}
