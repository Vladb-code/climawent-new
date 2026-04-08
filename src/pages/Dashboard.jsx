import React, { useEffect, useState } from "react";
import { Typography, Divider, Spin } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "./AboutCompany";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        '*[_type in ["installation","repair","cleaning","contract","portfolio"]]|order(_createdAt desc)',
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

  const renderSection = (type, title) => (
    <div id={type} style={{ marginTop: 40 }}>
      <Typography.Title
        level={2}
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        {title}
      </Typography.Title>
      <ServiceGrid items={data.filter((i) => i._type === type)} />
      <Divider style={{ margin: "60px 0" }} />
    </div>
  );

  return (
    <div className="fade-in">
      <section className="hero">
        <Typography.Title style={{ color: "#fff" }}>
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph
          style={{ color: "#fff", fontSize: 18, marginTop: 10 }}
        >
          {t("hero_sub")}
        </Typography.Paragraph>
      </section>

      {renderSection("installation", t("tabs_inst"))}
      {renderSection("repair", t("tabs_service"))}
      {renderSection("cleaning", t("tabs_cleaning"))}
      {renderSection("contract", t("tabs_contracts"))}

      <div id="portfolio">
        {renderSection("portfolio", t("tabs_portfolio"))}
      </div>
      <div id="about">
        <AboutCompany />
      </div>
    </div>
  );
}
