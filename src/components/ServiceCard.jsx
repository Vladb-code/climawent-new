import React, { useState } from "react";
import { Card, Modal, Carousel, Typography } from "antd";
import { urlFor } from "../sanityClient";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ item }) {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const title = item[`title_${lang}`] || item.title_ru;
  const description = item[`description_${lang}`] || item.description_ru;
  const price = item.price;
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
            src={urlFor(item.mainImage).width(500).url()}
            alt="service"
            className="service-img"
          />
        }
        onClick={() => setOpen(true)}
      >
        <Card.Meta
          title={title}
          description={
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {description}
            </Typography.Paragraph>
          }
        />
        {price && <div className="price">{price}</div>}
      </Card>

      <Modal
        title={title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <Carousel arrows infinite={false}>
          {images.filter(Boolean).map((img, i) => (
            <div key={i}>
              <img
                src={urlFor(img).width(800).url()}
                style={{ width: "100%", maxHeight: 500, objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
        <Typography.Paragraph style={{ marginTop: 20 }}>
          {description}
        </Typography.Paragraph>
        {price && (
          <Typography.Paragraph strong>Цена: {price}</Typography.Paragraph>
        )}
      </Modal>
    </>
  );
}
