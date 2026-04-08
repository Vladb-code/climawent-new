import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url"; // ИМЕННО ТАК, в скобках

export const client = createClient({
  projectId: "1lm1gn50",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-21",
});

// Используем новую функцию из импорта
const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source || !source.asset) {
    const stub = { url: () => "" };
    stub.width = () => stub;
    stub.height = () => stub;
    stub.fit = () => stub;
    return stub;
  }
  return builder.image(source);
};
