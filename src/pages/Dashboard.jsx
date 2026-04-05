import React, { useEffect, useState } from "react";
import { Row, Col, Input, Tabs, Divider, Spin, Typography, Button } from "antd";
import { client } from "../sanityClient";
import ServiceCard from "../components/ServiceCard";
import AboutCompany from "./AboutCompany";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        '*[_type in ["installation","serviceMaintenance","repair","cleaning","contract","portfolio"]] | order(_createdAt desc)',
      )
      .then((res) => {
        setData(res);
        setFiltered(res);
        setLoading(false);
      });
  }, []);

  const onSearch = (val) => {
    const s = val.toLowerCase();
    setFiltered(
      data.filter(
        (i) =>
          (i[`title_${lang}`] || "").toLowerCase().includes(s) ||
          (i[`description_${lang}`] || "").toLowerCase().includes(s),
      ),
    );
  };

  const renderGrid = (items) => (
    <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
      {items.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </Row>
  );

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg, #0050b3 0%, #1890ff 100%)",
          padding: "80px 20px 120px 20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography.Title
          style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 48px)" }}
        >
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 18,
            marginBottom: 30,
          }}
        >
          {t("hero_sub")}
        </Typography.Paragraph>
      </section>

      <div
        style={{ maxWidth: 800, margin: "-40px auto 40px", padding: "0 20px" }}
      >
        <Input.Search
          placeholder={t("search_placeholder")}
          enterButton
          size="large"
          onSearch={onSearch}
          allowClear
        />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <Tabs
          centered
          size="large"
          items={[
            {
              key: "all",
              label: t("tabs_all"),
              children: renderGrid(filtered),
            },
            {
              key: "installation",
              label: t("tabs_inst"),
              children: renderGrid(
                filtered.filter((i) => i._type === "installation"),
              ),
            },
            {
              key: "service",
              label: t("tabs_service"),
              children: renderGrid(
                filtered.filter((i) =>
                  ["serviceMaintenance", "repair"].includes(i._type),
                ),
              ),
            },
            {
              key: "cleaning",
              label: t("tabs_cleaning"),
              children: renderGrid(
                filtered.filter((i) => i._type === "cleaning"),
              ),
            },
            {
              key: "contracts",
              label: t("tabs_contracts"),
              children: renderGrid(
                filtered.filter((i) => i._type === "contract"),
              ),
            },
            {
              key: "portfolio",
              label: t("tabs_portfolio"),
              children: renderGrid(
                filtered.filter((i) => i._type === "portfolio"),
              ),
            },
          ]}
        />
        <Divider style={{ margin: "60px 0" }} />
        <AboutCompany />
      </div>
    </div>
  );
}
