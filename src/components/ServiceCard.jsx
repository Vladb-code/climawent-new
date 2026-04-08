import React, { useState } from "react";
import { Card, Modal, Carousel, Typography, Tag } from "antd";
import { urlFor } from "../sanityClient";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ item }) {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const title = item[`title_${lang}`] || item.title_ru;
  const desc = item[`description_${lang}`] || item.description_ru;
  const images = item.images
    ? [item.mainImage, ...item.images]
    : [item.mainImage];

  return (
    <>
      <Card
        hoverable
        className="service-card"
        cover={
          <img
            src={urlFor(item.mainImage).width(600).url()}
            alt="img"
            className="service-img"
          />
        }
        onClick={() => setOpen(true)}
      >
        <Card.Meta
          title={title}
          description={
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {desc}
            </Typography.Paragraph>
          }
        />
        {item.price && (
          <div style={{ marginTop: 10, color: "#1890ff", fontWeight: "bold" }}>
            {item.price}
          </div>
        )}
      </Card>

      <Modal
        title={title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={700}
        centered
      >
        <Carousel arrows>
          {images.map((img, i) => (
            <div key={i}>
              <img
                src={urlFor(img).url()}
                style={{ width: "100%", borderRadius: 8 }}
              />
            </div>
          ))}
        </Carousel>
        <Typography.Paragraph style={{ marginTop: 20, fontSize: 16 }}>
          {desc}
        </Typography.Paragraph>
        {item.price && (
          <Tag color="blue" style={{ fontSize: 14, padding: "5px 10px" }}>
            Цена: {item.price}
          </Tag>
        )}
      </Modal>
    </>
  );
}
