import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <Router basename="/climawent-new">
      <Layout style={{ minHeight: "100vh", background: "#fff" }}>
        <Header />
        <Layout.Content>
          <Routes>
            {/* Базовый путь для GitHub Pages */}
            <Route path="/" element={<Dashboard />} />
            {/* Обработка случая, если путь не найден (редирект на главную) */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Layout.Content>
        <Footer />
        <WhatsAppButton />
      </Layout>
    </Router>
  );
}
