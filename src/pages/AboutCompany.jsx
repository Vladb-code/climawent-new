import React, { useEffect, useState } from "react";
import { Typography, Image, Divider } from "antd";
import { client, urlFor } from "../sanityClient";
import { useTranslation } from "react-i18next";

export default function AboutCompany() {
  const [company, setCompany] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    client.fetch('*[_type == "aboutCompany"][0]').then(setCompany);
  }, []);

  if (!company) return null;

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <Typography.Title level={2}>
        {company[`title_${lang}`] || company.title_ru}
      </Typography.Title>
      {company.image && (
        <Image
          src={urlFor(company.image).width(800).url()}
          style={{
            borderRadius: 12,
            marginBottom: 20,
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
      <Typography.Paragraph
        style={{
          fontSize: 18,
          maxWidth: 800,
          margin: "0 auto",
          lineHeight: 1.6,
        }}
      >
        {company[`description_${lang}`] || company.description_ru}
      </Typography.Paragraph>
    </div>
  );
}
