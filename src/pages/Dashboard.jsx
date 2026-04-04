import React, { useState, useEffect } from "react";
import { Row, Col, Input, Select, Tabs, Spin, Alert } from "antd";
import { client } from "../sanityClient";
import ServiceCard from "../components/ServiceCard";

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    client
      .fetch('*[_type in ["installation","serviceMaintenance"]]')
      .then((data) => {
        setServices(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = services;

    if (selectedService) {
      temp = temp.filter((item) => item._id === selectedService);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      temp = temp.filter(
        (item) =>
          item.title?.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search),
      );
    }

    setFiltered(temp);
  }, [searchTerm, selectedService, services]);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  if (error)
    return <Alert message="Ошибка" description={error} type="error" showIcon />;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Clima Went Georgia</h2>

      <Search
        placeholder="Поиск услуги..."
        allowClear
        enterButton
        onSearch={(value) => setSearchTerm(value)}
        style={{ marginBottom: 20 }}
      />

      <Select
        placeholder="Выберите услугу"
        allowClear
        style={{ width: "100%", marginBottom: 20 }}
        onChange={(value) => setSelectedService(value)}
      >
        {services.map((item) => (
          <Option key={item._id} value={item._id}>
            {item.title}
          </Option>
        ))}
      </Select>

      <Tabs defaultActiveKey="all">
        <TabPane tab="Все услуги" key="all">
          <Row gutter={[15, 15]}>
            {filtered.length === 0 ? (
              <p>Ничего не найдено</p>
            ) : (
              filtered.map((item) => (
                <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                  <ServiceCard item={item} />
                </Col>
              ))
            )}
          </Row>
        </TabPane>
        <TabPane tab="Установка" key="installation">
          <Row gutter={[15, 15]}>
            {filtered
              .filter((i) => i._type === "installation")
              .map((item) => (
                <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                  <ServiceCard item={item} />
                </Col>
              ))}
          </Row>
        </TabPane>
        <TabPane tab="Мойка и ТО" key="serviceMaintenance">
          <Row gutter={[15, 15]}>
            {filtered
              .filter((i) => i._type === "serviceMaintenance")
              .map((item) => (
                <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                  <ServiceCard item={item} />
                </Col>
              ))}
          </Row>
        </TabPane>
        <TabPane tab="О компании" key="aboutCompany">
          <p>Нажмите на вкладку "О компании", чтобы узнать информацию о нас</p>
        </TabPane>
      </Tabs>
    </div>
  );
}
