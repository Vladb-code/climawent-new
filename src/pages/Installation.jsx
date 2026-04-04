import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Alert, Typography } from "antd";
import { client } from "../sanityClient";
import ServiceCard from "../components/ServiceCard";

const { Title } = Typography;

export default function Installation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch('*[_type == "installation"]')
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  if (error)
    return <Alert message="Ошибка" description={error} type="error" showIcon />;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2}>Установка</Title>
      <Row gutter={[15, 15]}>
        {items.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          items.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
              <ServiceCard item={item} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
