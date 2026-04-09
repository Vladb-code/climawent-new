import React, { useEffect, useState } from "react";
import { Typography, Spin, Select, ConfigProvider } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "./AboutCompany.jsx";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("installation");

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

  const selectOptions = [
    { value: "installation", label: t("nav_installation") },
    { value: "repair", label: t("nav_service") },
    { value: "cleaning", label: t("nav_cleaning") },
  ];

  return (
    <div className="fade-in">
      <section className="hero">
        <Typography.Title
          style={{ color: "#fff", margin: 0, fontSize: "1.8rem" }}
        >
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph
          style={{ color: "#fff", marginTop: 10, fontSize: "1rem" }}
        >
          {t("hero_sub")}
        </Typography.Paragraph>
      </section>

      <div className="main-content-card">
        {/* Выбор услуги через выпадающий список */}
        <div
          id="services"
          style={{ textAlign: "center", marginBottom: 40, padding: "0 10px" }}
        >
          <Typography.Paragraph
            strong
            style={{ marginBottom: 12, fontSize: 16 }}
          >
            {t("select_service")}
          </Typography.Paragraph>

          <ConfigProvider
            theme={{ token: { colorPrimary: "#1890ff", borderRadius: 8 } }}
          >
            <Select
              value={activeCategory}
              onChange={(val) => setActiveCategory(val)}
              style={{ width: "100%", maxWidth: 400, height: 50 }}
              size="large"
              options={selectOptions}
            />
          </ConfigProvider>

          <div style={{ marginTop: 30 }}>
            <ServiceGrid items={getItems("service", activeCategory)} />
          </div>
        </div>

        {/* Секции Portfolio, Contracts, About */}
        <div
          id="portfolio"
          style={{ padding: "60px 0 20px", borderTop: "1px solid #f0f0f0" }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 25 }}
          >
            {t("nav_portfolio")}
          </Typography.Title>
          <ServiceGrid items={getItems("portfolio").slice(0, 4)} />
        </div>

        <div
          id="contracts"
          style={{ padding: "60px 0", borderTop: "1px solid #f0f0f0" }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 25 }}
          >
            {t("nav_contracts")}
          </Typography.Title>
          <ServiceGrid items={getItems("contract")} />
        </div>

        <div
          id="about"
          style={{ padding: "40px 0", borderTop: "1px solid #f0f0f0" }}
        >
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
