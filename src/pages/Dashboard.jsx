import React, { useEffect, useState } from "react";
import { Row, Col, Input, Tabs, Spin, Typography } from "antd";
import { client } from "../sanityClient";
import ServiceCard from "../components/ServiceCard";
import AboutCompany from "./AboutCompany";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type in ["service", "portfolio"]] | order(_createdAt desc)')
      .then((res) => {
        setData(res);
        setFiltered(res);
        setLoading(false);
      });
  }, []);

  const onSearch = (val) => {
    const s = val.toLowerCase();
    setFiltered(
      data.filter((i) =>
        (i[`title_${i18n.language}`] || i.title_ru || "")
          .toLowerCase()
          .includes(s),
      ),
    );
  };

  const renderGrid = (items) => (
    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
      {items.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </Row>
  );

  if (loading) return <Spin size="large" className="loader" />;

  return (
    <div className="fade-in">
      <div className="hero">
        <Typography.Title style={{ color: "#fff" }}>
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#fff", opacity: 0.9 }}>
          {t("hero_sub")}
        </Typography.Paragraph>
      </div>

      <div className="search-box">
        <Input.Search
          placeholder={t("search_placeholder")}
          enterButton
          size="large"
          onSearch={onSearch}
          allowClear
        />
      </div>

      <div className="container">
        <Tabs
          centered
          size="large"
          items={[
            { key: "1", label: t("tabs_all"), children: renderGrid(filtered) },
            {
              key: "2",
              label: t("tabs_inst"),
              children: renderGrid(
                filtered.filter((i) => i.category === "installation"),
              ),
            },
            {
              key: "3",
              label: t("tabs_service"),
              children: renderGrid(
                filtered.filter((i) => i.category === "repair"),
              ),
            },
            {
              key: "4",
              label: t("tabs_cleaning"),
              children: renderGrid(
                filtered.filter((i) => i.category === "cleaning"),
              ),
            },
            {
              key: "5",
              label: t("tabs_portfolio"),
              children: renderGrid(
                filtered.filter((i) => i._type === "portfolio"),
              ),
            },
          ]}
        />
        <AboutCompany />
      </div>
    </div>
  );
}
