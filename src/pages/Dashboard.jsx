import React, { useEffect, useState } from "react";
import { Typography, Spin, Tabs, ConfigProvider, Segmented } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "./AboutCompany.jsx";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemType, setSystemType] = useState("ac"); // 'ac' или 'vent'

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

  // Фильтрация: проверяем тип документа + тип системы (ac/vent) + категорию (установка/ремонт)
  const getItems = (type, category = null, system = null) => {
    return data.filter((i) => {
      const isType = i._type === type;
      // Если system указан, проверяем поле system_type в Sanity
      const isSystem = system ? i.system_type === system : true;
      const isCategory = category ? i.category === category : true;
      return isType && isSystem && isCategory;
    });
  };

  const dynamicTabs = [
    {
      key: "inst",
      label: t("nav_installation"),
      children: (
        <ServiceGrid items={getItems("service", "installation", systemType)} />
      ),
    },
    {
      key: "rep",
      label: t("nav_service"),
      children: (
        <ServiceGrid items={getItems("service", "repair", systemType)} />
      ),
    },
    {
      key: "cln",
      label: t("nav_cleaning"),
      children: (
        <ServiceGrid items={getItems("service", "cleaning", systemType)} />
      ),
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
        <div id="services">
          <div className="system-selector-container">
            <Segmented
              block
              size="large"
              value={systemType}
              onChange={(value) => setSystemType(value)}
              options={[
                { label: t("system_ac"), value: "ac" },
                { label: t("system_vent"), value: "vent" },
              ]}
              style={{ maxWidth: 500, width: "100%" }}
            />
          </div>

          <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
            <Tabs
              defaultActiveKey="inst"
              activeKey={undefined} // позволяет переключать табы внутри
              items={dynamicTabs}
              centered
              size="large"
              className="centered-tabs"
            />
          </ConfigProvider>
        </div>

        <div
          id="portfolio"
          style={{ padding: "60px 0 20px", borderTop: "1px solid #f0f0f0" }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 25 }}
          >
            {t("nav_portfolio")} (
            {systemType === "ac" ? t("system_ac") : t("system_vent")})
          </Typography.Title>
          <ServiceGrid
            items={getItems("portfolio", null, systemType).slice(0, 4)}
          />
        </div>

        <div
          id="contracts"
          style={{ padding: "40px 0", borderTop: "1px solid #f0f0f0" }}
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
