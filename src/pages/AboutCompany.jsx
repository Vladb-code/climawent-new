import React, { useEffect, useState } from "react";
import { client, urlFor } from "../sanityClient";
import { Typography, Spin, Alert, Image } from "antd";

const { Title, Paragraph } = Typography;

export default function AboutCompany() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch('*[_type == "aboutCompany"][0]')
      .then((data) => {
        setCompany(data);
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
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <Title level={2}>{company.title}</Title>
      {company.image && (
        <Image
          src={urlFor(company.image).width(600).url()}
          alt={company.title}
          style={{ marginBottom: 20 }}
        />
      )}
      <Paragraph>{company.description}</Paragraph>
    </div>
  );
}
