import { createClient , type ClientConfig } from "next-sanity";

 const sanityClient: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2023-01-01",
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN
 }
 export default createClient(sanityClient);