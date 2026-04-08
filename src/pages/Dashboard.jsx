import React, { useEffect, useState } from "react";
import { Typography, Spin, Tabs, ConfigProvider } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "./AboutCompany.jsx"; // Добавил .jsx для надежности
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type in ["service", "portfolio", "contract"]] | order(_createdAt desc)`,
      )
      .then((res) => {
        setData(res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  const getItems = (type, category = null) => {
    return data.filter(
      (i) => i._type === type && (category ? i.category === category : true),
    );
  };

  // Только услуги для навигации (Tabs)
  const serviceTabs = [
    {
      key: "installation",
      label: t("nav_installation"),
      children: <ServiceGrid items={getItems("service", "installation")} />,
    },
    {
      key: "repair",
      label: t("nav_service"),
      children: <ServiceGrid items={getItems("service", "repair")} />,
    },
    {
      key: "cleaning",
      label: t("nav_cleaning"),
      children: <ServiceGrid items={getItems("service", "cleaning")} />,
    },
  ];

  return (
    <div className="fade-in">
      <section className="hero">
        <Typography.Title style={{ color: "#fff" }}>
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#fff", fontSize: 16 }}>
          {t("hero_sub")}
        </Typography.Paragraph>
      </section>

      <div
        className="section-container"
        style={{
          marginTop: -30,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Блок Услуг */}
        <div id="services">
          <Tabs
            defaultActiveKey="installation"
            items={serviceTabs}
            centered
            size="large"
            style={{ marginBottom: 40 }}
          />
        </div>

        {/* Блок Портфолио (Наши работы) */}
        <div id="portfolio" style={{ padding: "40px 0" }}>
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            {t("nav_portfolio")}
          </Typography.Title>
          {/* Берем 4 случайные или последние работы */}
          <ServiceGrid items={getItems("portfolio").slice(0, 4)} />
        </div>

        {/* Секция Контракты (для перехода из меню) */}
        <div id="contracts" style={{ padding: "40px 0" }}>
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            {t("nav_contracts")}
          </Typography.Title>
          <ServiceGrid items={getItems("contract")} />
        </div>

        <div id="about" style={{ padding: "40px 0" }}>
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
