import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "1lm1gn50",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  // Добавляем проверку, чтобы builder всегда получал корректные данные
  if (!source || (source._type !== "image" && !source.asset)) {
    return { url: () => "", width: () => ({ url: () => "" }) };
  }
  return builder.image(source);
};
