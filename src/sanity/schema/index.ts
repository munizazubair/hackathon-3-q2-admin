import { type SchemaTypeDefinition } from "sanity";
import { productSchema } from "./products"
import faqs from "./faqs";

export const schema: SchemaTypeDefinition[] = [productSchema , faqs ];
