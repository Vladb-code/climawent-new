import React, { useEffect, useState } from "react";
import { Typography, Spin, Tabs, ConfigProvider } from "antd";
import { client } from "../sanityClient";
import ServiceGrid from "../components/ServiceGrid";
import AboutCompany from "./AboutCompany";
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

  // Функция для фильтрации данных по категории
  const getItems = (type, category = null) => {
    return data.filter(
      (i) => i._type === type && (category ? i.category === category : true),
    );
  };

  // Настройка вкладок (разделов)
  const tabItems = [
    {
      key: "1",
      label: t("nav_installation"),
      children: <ServiceGrid items={getItems("service", "installation")} />,
    },
    {
      key: "2",
      label: t("nav_service"),
      children: <ServiceGrid items={getItems("service", "repair")} />,
    },
    {
      key: "3",
      label: t("nav_cleaning"),
      children: <ServiceGrid items={getItems("service", "cleaning")} />,
    },
    {
      key: "4",
      label: t("nav_contracts"),
      children: <ServiceGrid items={getItems("contract")} />,
    },
    {
      key: "5",
      label: t("nav_portfolio"),
      children: <ServiceGrid items={getItems("portfolio")} />,
    },
  ];

  return (
    <div className="fade-in">
      <section className="hero">
        <Typography.Title style={{ color: "#fff", marginBottom: 10 }}>
          {t("hero_title")}
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#fff", opacity: 0.9 }}>
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
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                horizontalMargin: "0 0 20px 0",
                titleFontSize: 16,
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            centered
            size="large"
            tabBarGutter={20}
            // Это сделает прокрутку вкладок на мобилках удобной
            style={{ marginBottom: 40 }}
          />
        </ConfigProvider>

        <div id="about" style={{ paddingTop: 40 }}>
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
