import { groq } from "next-sanity";
import sanityClient from "./sanity.client";

export async function GetProductData() {
    return sanityClient.fetch(
        groq`
        *[_type == "products"] {
  _id,
  title,
  price,
  priceWithoutDiscount,
  badge,
  "imageURL":image.asset->url,
  category->{
    _id,
    title
  },
  description,
  inventory,
  tags,
  reviews[] {
        username,
        reviewText,
      }
    }`
    )
}
export async function GetCategoriesData() {
  return sanityClient.fetch(
      groq`
      *[_type == "categories"] {
_id,
title,
products,
"imageURL": image.asset->url,

}
      `
  )
}

export async function GetFeaturedProducts() {
    return sanityClient.fetch(
        groq`
        *[_type == "products" && "featured" in tags][0..3]{
  _id,
  title,
  price,
  priceWithoutDiscount,
  badge,
  "imageURL":image.asset->url,
  category->{
    _id,
    title
  },
  description,
  inventory,
  tags
}`
    )
    
}


export async function GetGalleryProducts() {
    return sanityClient.fetch(
        groq`
        *[_type == "products" && "gallery" in tags]{
  _id,
  title,
  price,
  priceWithoutDiscount,
  badge,
  "imageURL":image.asset->url,
  category->{
    _id,
    title
  },
  description,
  inventory,
  tags
}`
    )
    
}
export async function GetInstagramProducts() {
  return sanityClient.fetch(
      groq`
      *[_type == "products" && "instagram" in tags][0..5]{
_id,
title,
price,
priceWithoutDiscount,
badge,
"imageURL":image.asset->url,
category->{
  _id,
  title
},
description,
inventory,
tags
}`
  )
  
}



export async function GetProductData2() {
    return sanityClient.fetch(
        groq`
        *[_type == "products"][0..5]{
  _id,
  title,
  price,
  priceWithoutDiscount,
  badge,
  "imageURL":image.asset->url,
  category->{
    _id,
    title
  },
  description,
  inventory,
  tags
}`
    )
    
}
export async function GetCategoryWithProductsData(categoryId: string) {
  return sanityClient.fetch(
    groq`
    *[_type == "categories" && _id == $categoryId] {
      title,
      "imageURL": image.asset->url,
      products[]->{
        _id,
        title,
        price,
        priceWithoutDiscount,
        badge,
        "imageURL": image.asset->url,
        category->{
          _id,
          title
        },
        description,
        inventory,
        tags
      }
    }`,
    { categoryId } // passing the categoryId to the query
  );
}
export async function faqQuery() {
  return sanityClient.fetch(
    groq`
*[_type == "faq"]{
  _id,
  question,
  answer
}`
  )
}