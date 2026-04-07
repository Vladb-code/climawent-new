import React, { useEffect, useState } from "react";
import { Row, Col, Input, Tabs, Spin, Typography, Divider } from "antd";
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
    // Тянем все услуги, старые типы и портфолио
    client
      .fetch(
        '*[_type in ["service", "portfolio", "installation", "cleaning", "repair", "contract"]] | order(_createdAt desc)',
      )
      .then((res) => {
        setData(res || []);
        setFiltered(res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderGrid = (items) => (
    <Row gutter={[20, 20]} style={{ marginTop: 20, minHeight: "150px" }}>
      {items.length > 0 ? (
        items.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
            <ServiceCard item={item} />
          </Col>
        ))
      ) : (
        <Col span={24} style={{ textAlign: "center", padding: "40px 0" }}>
          <Typography.Text type="secondary">
            Нет данных в этом разделе
          </Typography.Text>
        </Col>
      )}
    </Row>
  );

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  return (
    <div className="fade-in">
      <section
        className="hero"
        style={{
          background: "linear-gradient(135deg, #0050b3 0%, #1890ff 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography.Title style={{ color: "#fff", margin: 0 }}>
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          {t("hero_sub")}
        </Typography.Paragraph>
      </section>

      <div
        className="search-box"
        style={{ maxWidth: 600, margin: "-30px auto 30px", padding: "0 15px" }}
      >
        <Input.Search
          placeholder={t("search_placeholder")}
          enterButton
          size="large"
          onSearch={(val) =>
            setFiltered(
              data.filter((i) =>
                (i[`title_${i18n.language}`] || i.title_ru || "")
                  .toLowerCase()
                  .includes(val.toLowerCase()),
              ),
            )
          }
          allowClear
        />
      </div>

      <div className="container">
        <div id="services">
          <Tabs
            centered
            size="large"
            items={[
              {
                key: "all",
                label: t("tabs_all"),
                children: renderGrid(
                  filtered.filter(
                    (i) =>
                      i._type === "service" ||
                      [
                        "installation",
                        "cleaning",
                        "repair",
                        "contract",
                      ].includes(i._type),
                  ),
                ),
              },
              {
                key: "inst",
                label: t("tabs_inst"),
                children: renderGrid(
                  filtered.filter(
                    (i) =>
                      i.category === "installation" ||
                      i._type === "installation",
                  ),
                ),
              },
              {
                key: "rep",
                label: t("tabs_service"),
                children: renderGrid(
                  filtered.filter(
                    (i) => i.category === "repair" || i._type === "repair",
                  ),
                ),
              },
              {
                key: "cln",
                label: t("tabs_cleaning"),
                children: renderGrid(
                  filtered.filter(
                    (i) => i.category === "cleaning" || i._type === "cleaning",
                  ),
                ),
              },
              {
                key: "cnt",
                label: t("tabs_contracts"),
                children: renderGrid(
                  filtered.filter(
                    (i) => i.category === "contract" || i._type === "contract",
                  ),
                ),
              },
            ]}
          />
        </div>

        <Divider style={{ margin: "60px 0" }} />

        <div id="portfolio">
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            {t("tabs_portfolio")}
          </Typography.Title>
          {renderGrid(data.filter((i) => i._type === "portfolio"))}
        </div>

        <Divider style={{ margin: "60px 0" }} />

        <div id="about">
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
