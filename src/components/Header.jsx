import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Typography, Select } from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const menuItems = [
    { label: <Link to="/">{t("nav_home")}</Link>, key: "1" },
    { label: <Link to="/about">{t("nav_about")}</Link>, key: "2" },
    {
      label: <Link to="/installation">{t("nav_installation")}</Link>,
      key: "3",
    },
    {
      label: <Link to="/service-maintenance">{t("nav_service")}</Link>,
      key: "4",
    },
    { label: <Link to="/cleaning">{t("nav_cleaning")}</Link>, key: "5" },
    { label: <Link to="/contracts">{t("nav_contracts")}</Link>, key: "6" },
    { label: <Link to="/portfolio">{t("nav_portfolio")}</Link>, key: "7" },
  ];

  return (
    <Layout.Header
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        height: 70,
      }}
    >
      <Typography.Title
        level={3}
        style={{ margin: 0, color: "#0050b3", fontWeight: 800 }}
      >
        CLIMA<span style={{ color: "#1890ff" }}>WENT</span>
      </Typography.Title>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div className="nav-desktop">
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ border: "none", background: "transparent" }}
          />
        </div>

        <Select
          defaultValue={i18n.language}
          onChange={(value) => i18n.changeLanguage(value)}
          suffixIcon={<GlobalOutlined />}
          style={{ width: 80 }}
          options={[
            { value: "ru", label: "RU" },
            { value: "ka", label: "GE" },
            { value: "en", label: "EN" },
          ]}
        />

        <Button
          className="nav-mobile-btn"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />
      </div>

      <Drawer title={t("nav_home")} onClose={() => setOpen(false)} open={open}>
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setOpen(false)}
        />
      </Drawer>

      <style>{`
        @media (max-width: 768px) { 
          .nav-desktop { display: none; } 
          .nav-mobile-btn { display: block; } 
        }
        @media (min-width: 769px) { 
          .nav-desktop { display: flex; } 
          .nav-mobile-btn { display: none; } 
        }
      `}</style>
    </Layout.Header>
  );
}
