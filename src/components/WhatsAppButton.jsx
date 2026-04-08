import React from "react";

export default function WhatsAppButton() {
  const phone = "995555159173";
  return (
    <div
      className="wa-button"
      onClick={() => window.open(`https://wa.me/${phone}`, "_blank")}
    >
      💬
    </div>
  );
}
