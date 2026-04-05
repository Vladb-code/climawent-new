import React, { useState } from "react";
import { Card, Modal, Carousel, Typography } from "antd";
import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ item }) {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const images = item.images
    ? [item.mainImage, ...item.images]
    : [item.mainImage];

  const displayTitle = item[`title_${lang}`] || item.title_ru || "No Title";
  const displayDescription =
    item[`description_${lang}`] || item.description_ru || "";

  return (
    <>
      <Card
        hoverable
        cover={
          <img
            src={urlFor(item.mainImage).width(400).url()}
            style={{ height: 200, objectFit: "cover" }}
          />
        }
        onClick={() => setOpen(true)}
      >
        <Card.Meta title={displayTitle} description={displayDescription} />
      </Card>

      <Modal
        title={displayTitle}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={750}
        centered
      >
        <Carousel arrows style={{ background: "#f0f0f0", marginBottom: 20 }}>
          {images.filter(Boolean).map((img, i) => (
            <div key={i}>
              <img
                src={urlFor(img).width(800).url()}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </Carousel>
        <PortableText value={item.content} />
        {item.price && (
          <Typography.Paragraph style={{ marginTop: 20 }}>
            <strong>Цена:</strong> {item.price}
          </Typography.Paragraph>
        )}
      </Modal>
    </>
  );
}
