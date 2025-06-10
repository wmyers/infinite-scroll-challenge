import { z } from 'zod';

// see https://dummyjson.com/docs/products

export const ProductSchema = z
  .object({
    id: z.number().min(1),
    title: z.string(),
    description: z.string(),
    price: z.number().min(0),
    thumbnail: z.string(),
    images: z.array(z.string()),
  })
  .strict();

export type Product = z.infer<typeof ProductSchema>;
