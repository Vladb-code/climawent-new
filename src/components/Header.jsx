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
          fontSize: "1.2rem",
        }}
      >
        CLIMA<span style={{ color: "#1890ff" }}>WENT</span>
      </Typography.Title>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Десктопное меню: видно только на больших экранах */}
        <div
          className="nav-desktop"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ border: "none", minWidth: 350, background: "transparent" }}
          />
          <Select
            defaultValue={i18n.language}
            onChange={(val) => i18n.changeLanguage(val)}
            suffixIcon={<GlobalOutlined />}
            style={{ width: 70, marginLeft: 10 }}
            options={[
              { value: "ru", label: "RU" },
              { value: "ka", label: "GE" },
              { value: "en", label: "EN" },
            ]}
          />
        </div>

        {/* Бургер-кнопка: только для мобильных */}
        <Button
          className="nav-mobile-btn"
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24 }} />}
          onClick={() => setOpen(true)}
          style={{ display: "none" }}
        />
      </div>

      <Drawer
        title="CLIMAWENT"
        onClose={() => setOpen(false)}
        open={open}
        width={280}
        placement="right"
      >
        <div style={{ marginBottom: 20 }}>
          <Typography.Paragraph strong style={{ marginBottom: 8 }}>
            {t("select_lang") || "Выберите язык:"}
          </Typography.Paragraph>
          <Select
            defaultValue={i18n.language}
            onChange={(val) => {
              i18n.changeLanguage(val);
              setOpen(false);
            }}
            style={{ width: "100%" }}
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
          style={{ border: "none", fontSize: "18px" }}
        />
      </Drawer>
    </Layout.Header>
  );
}
