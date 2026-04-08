import React, { useEffect, useState } from "react";
import { Typography, Spin, Divider } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "../components/AboutCompany";
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
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  const renderSection = (id, type, category, title) => {
    const items = data.filter(
      (i) => i._type === type && (category ? i.category === category : true),
    );
    if (items.length === 0) return null;
    return (
      <div id={id} className="section-container">
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          {title}
        </Typography.Title>
        <ServiceGrid items={items} />
        <Divider />
      </div>
    );
  };

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

      {renderSection(
        "installation",
        "service",
        "installation",
        t("nav_installation"),
      )}
      {renderSection("repair", "service", "repair", t("nav_service"))}
      {renderSection("cleaning", "service", "cleaning", t("nav_cleaning"))}
      {renderSection("contracts", "contract", null, t("nav_contracts"))}
      {renderSection("portfolio", "portfolio", null, t("nav_portfolio"))}

      <div id="about" className="section-container">
        <AboutCompany />
      </div>
    </div>
  );
}
