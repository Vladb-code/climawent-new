import React from "react";
import { Layout } from "antd";

export default function Footer() {
  return (
    <Layout.Footer
      style={{ textAlign: "center", background: "#f0f2f5", marginTop: 50 }}
    >
      © {new Date().getFullYear()} Clima Went Georgia. Все права защищены.
    </Layout.Footer>
  );
}
