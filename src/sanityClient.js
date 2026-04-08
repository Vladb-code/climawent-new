import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url"; // Изменили импорт здесь

export const client = createClient({
  projectId: "1lm1gn50",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-21",
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  // Если картинки нет или она битая, возвращаем объект-заглушку с методами
  if (!source || !source.asset) {
    return {
      url: () => "",
      width: () => ({ url: () => "" }),
      fit: () => ({ url: () => "" }),
    };
  }
  return builder.image(source);
};
