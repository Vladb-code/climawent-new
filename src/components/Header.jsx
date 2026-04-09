import React, { useState } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Typography,
  Select,
  Button,
  Divider,
} from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const menuItems = [
    { key: "home", label: <a href="#services">{t("nav_home")}</a> },
    { key: "portfolio", label: <a href="#portfolio">{t("nav_portfolio")}</a> },
    { key: "contracts", label: <a href="#contracts">{t("nav_contracts")}</a> },
    { key: "about", label: <a href="#about">{t("nav_about")}</a> },
  ];

  return (
    <Layout.Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 15px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height: 65,
        width: "100%",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: 0,
          color: "#0050b3",
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        CLIMA<span style={{ color: "#1890ff" }}>WENT</span>
      </Typography.Title>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Это меню будет скрыто через CSS на мобилках */}
        <div className="nav-desktop">
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ border: "none", minWidth: 350 }}
          />
          <Select
            defaultValue={i18n.language}
            onChange={(val) => i18n.changeLanguage(val)}
            style={{ width: 70, marginLeft: 15 }}
            options={[
              { value: "ru", label: "RU" },
              { value: "ka", label: "GE" },
              { value: "en", label: "EN" },
            ]}
          />
        </div>

        {/* Кнопка бургер, которая видна ТОЛЬКО на мобилках */}
        <Button
          className="nav-mobile-btn"
          type="text"
          style={{ display: "none" }}
          icon={<MenuOutlined style={{ fontSize: 24 }} />}
          onClick={() => setOpen(true)}
        />
      </div>

      <Drawer
        title="Меню"
        onClose={() => setOpen(false)}
        open={open}
        width={280}
      >
        <div style={{ marginBottom: 20 }}>
          <Typography.Text type="secondary">Язык:</Typography.Text>
          <Select
            defaultValue={i18n.language}
            onChange={(val) => {
              i18n.changeLanguage(val);
              setOpen(false);
            }}
            style={{ width: "100%", marginTop: 8 }}
            options={[
              { value: "ru", label: "Русский" },
              { value: "ka", label: "ქართული" },
              { value: "en", label: "English" },
            ]}
          />
        </div>
        <Divider />
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setOpen(false)}
          style={{ border: "none" }}
        />
      </Drawer>
    </Layout.Header>
  );
}
