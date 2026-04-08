import React, { useEffect, useState } from "react";
import { Typography, Spin, Tabs, ConfigProvider } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "./AboutCompany.jsx";
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
        <Typography.Title style={{ color: "#fff", margin: 0 }}>
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#fff", marginTop: 10 }}>
          {t("hero_sub")}
        </Typography.Paragraph>
      </section>

      <div className="main-content-card">
        {/* Услуги */}
        <div id="services">
          <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
            <Tabs
              defaultActiveKey="installation"
              items={serviceTabs}
              centered
              animated={{ inkBar: true, tabPane: true }}
              size="middle"
            />
          </ConfigProvider>
        </div>

        {/* Портфолио */}
        <div id="portfolio" style={{ padding: "60px 0 20px" }}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 25 }}
          >
            {t("nav_portfolio")}
          </Typography.Title>
          <ServiceGrid items={getItems("portfolio").slice(0, 4)} />
        </div>

        {/* Контракты */}
        <div id="contracts" style={{ padding: "40px 0" }}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 25 }}
          >
            {t("nav_contracts")}
          </Typography.Title>
          <ServiceGrid items={getItems("contract")} />
        </div>

        {/* О нас */}
        <div id="about" style={{ padding: "40px 0" }}>
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
