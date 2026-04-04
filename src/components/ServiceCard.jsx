import React, { useState } from "react";
import { Card, Modal, Button } from "antd";
import { urlFor } from "../sanityClient";

export default function ServiceCard({ item }) {
  const [open, setOpen] = useState(false);

  const descriptionText =
    item.description ||
    item.content?.[0]?.children?.[0]?.text ||
    "Нет описания";

  // Собираем все изображения: mainImage + images
  const images = [];
  if (item.mainImage) images.push(item.mainImage);
  if (item.images?.length) images.push(...item.images);

  return (
    <>
      <Card
        hoverable
        cover={
          images[0] ? (
            <img
              alt={item.title}
              src={urlFor(images[0]).width(400).height(250).url()}
              style={{ objectFit: "cover", height: 200 }}
            />
          ) : (
            <div style={{ height: 200, background: "#eee" }} />
          )
        }
        onClick={() => setOpen(true)}
        style={{ borderRadius: 12 }}
      >
        <Card.Meta
          title={item.title}
          description={
            <>
              <p style={{ color: "#666" }}>{descriptionText}</p>
              {item.price && (
                <p style={{ fontWeight: "bold" }}>{item.price} ₾</p>
              )}
            </>
          }
        />
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          style={{ marginTop: 10 }}
        >
          Подробнее
        </Button>
      </Card>

      <Modal
        title={item.title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
      >
        {/* Показываем все изображения */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={urlFor(img).width(600).url()}
            alt={`${item.title} ${idx + 1}`}
            style={{ width: "100%", marginBottom: 15, borderRadius: 8 }}
          />
        ))}

        <p>{descriptionText}</p>
        {item.price && <p style={{ fontWeight: "bold" }}>{item.price} ₾</p>}

        {item.content && (
          <div>
            {item.content.map((block, i) => (
              <p key={i}>{block.children?.map((c) => c.text).join(" ")}</p>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
