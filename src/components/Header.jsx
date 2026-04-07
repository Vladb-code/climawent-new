import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Typography, Select } from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      label: (
        <a href="#services" onClick={() => setOpen(false)}>
          {t("nav_home")}
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="#portfolio" onClick={() => setOpen(false)}>
          {t("nav_portfolio")}
        </a>
      ),
      key: "7",
    },
    {
      label: (
        <a href="#about" onClick={() => setOpen(false)}>
          {t("nav_about")}
        </a>
      ),
      key: "8",
    },
  ];

  return (
    <Layout.Header
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height: 70,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Typography.Title
        level={3}
        style={{ margin: 0, color: "#0050b3", fontWeight: 800 }}
      >
        CLIMA<span style={{ color: "#1890ff" }}>WENT</span>
      </Typography.Title>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div className="nav-desktop">
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ border: "none", background: "transparent", minWidth: 280 }}
          />
        </div>

        <Select
          defaultValue={i18n.language}
          onChange={(val) => i18n.changeLanguage(val)}
          suffixIcon={<GlobalOutlined />}
          style={{ width: 70 }}
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

      <Drawer
        title="Меню"
        onClose={() => setOpen(false)}
        open={open}
        width={250}
      >
        <Menu mode="vertical" items={menuItems} />
      </Drawer>
    </Layout.Header>
  );
}
