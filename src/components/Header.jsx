import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

export default function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <header
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Clima Went Georgia</h2>
        <div className="desktop-menu" style={{ display: "none" }}>
          <Menu mode="horizontal" selectable={false}>
            <Menu.Item>
              <Link to="/">Главная</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/installation">Установка</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/service-maintenance">Мойка и ТО</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about">О компании</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Button
          className="mobile-menu-btn"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />
        <Drawer
          placement="right"
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Menu mode="vertical" selectable={false}>
            <Menu.Item onClick={() => setVisible(false)}>
              <Link to="/">Главная</Link>
            </Menu.Item>
            <Menu.Item onClick={() => setVisible(false)}>
              <Link to="/installation">Установка</Link>
            </Menu.Item>
            <Menu.Item onClick={() => setVisible(false)}>
              <Link to="/service-maintenance">Мойка и ТО</Link>
            </Menu.Item>
            <Menu.Item onClick={() => setVisible(false)}>
              <Link to="/about">О компании</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </header>
  );
}
