import React, { useState } from "react";
import { Card, Modal, Carousel, Typography, Tag } from "antd";
import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ item }) {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const displayTitle = item[`title_${lang}`] || item.title_ru;
  const displayDesc = item[`description_${lang}`] || item.description_ru;
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
          title={displayTitle}
          description={
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {displayDesc}
            </Typography.Paragraph>
          }
        />
        {item.price && <div className="price">{item.price}</div>}
      </Card>

      <Modal
        title={displayTitle}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <Carousel
          arrows
          infinite={false}
          style={{ background: "#f7f7f7", borderRadius: 8, overflow: "hidden" }}
        >
          {images.filter(Boolean).map((img, i) => (
            <div key={i}>
              <img
                src={urlFor(img).width(800).url()}
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </Carousel>
        <div style={{ marginTop: 20 }}>
          <PortableText value={item.content} />
        </div>
      </Modal>
    </>
  );
}
