import React from "react";
import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Header />
      <Layout.Content>
        <Dashboard />
      </Layout.Content>
      <Footer />
      <WhatsAppButton />
    </Layout>
  );
}
