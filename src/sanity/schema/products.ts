import { defineType } from "sanity";

export const productSchema = defineType({
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(50)
          .error("Title must be between 3 and 50 characters."),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error("Price must be a positive number."),
    },
    {
      title: "Price without Discount",
      name: "priceWithoutDiscount",
      type: "number",
      validation: (Rule) =>
        Rule.min(0)
          .custom((value, context) => {
            const price = context.document?.price;
            if (value && price && value < price) {
              return "Price without discount must not be less than the discounted price.";
            }
            return true;
          }),
    },
    {
      name: "badge",
      title: "Badge",
      type: "string",
      validation: (Rule) =>
        Rule.max(20)
          .error("Badge text should not exceed 20 characters."),
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      validation: (Rule) =>
        Rule.required()
          .error("Product image is required."),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "categories" }],
      validation: (Rule) =>
        Rule.required()
          .error("Category is required."),
    },
    {
      name: "description",
      title: "Product Description",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .error("Description must be between 10 and 500 characters."),
    },
    {
      name: "inventory",
      title: "Inventory Management",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error("Inventory must be 0 or more."),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Featured", value: "featured" },
          {
            title: "Follow products and discounts on Instagram",
            value: "instagram",
          },
          { title: "Gallery", value: "gallery" },
          { title: "Detail Page", value: "detail" },
        ],
      },
      validation: (Rule) =>
        Rule.unique()
          .error("Tags must be unique."),
    },
    {
      name: 'quantity',
      type: 'number',
      title: 'Quantity',
      validation: (Rule: any) => Rule.min(0).error('Stock level must be a positive number.'),
    },
    {
      name: "reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "username", type: "string", title: "UserName" },
            { name: "reviewText", type: "text", title: "Review Text" },
          ],
        },
      ],
    },
    {
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Unpublished", value: "unpublished" }
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Product status is required."),
    },
  ],
});
