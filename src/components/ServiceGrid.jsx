import React from "react";
import { Row, Col } from "antd";
import ServiceCard from "./ServiceCard";

export default function ServiceGrid({ items }) {
  return (
    <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
      {items.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </Row>
  );
}
