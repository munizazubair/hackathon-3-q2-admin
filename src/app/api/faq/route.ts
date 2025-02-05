// /pages/api/faqs.ts (or /pages/api/route.ts)
import { NextResponse } from 'next/server';
import sanityClient from '@/sanity/sanity.client';


interface FAQ {
  _id: number;
  question: string;
  answer: string;
}
async function createFAQ(newFAQ: FAQ) {
  const result = await sanityClient.create({
    _type: 'faq', 
    question: newFAQ.question,
    answer: newFAQ.answer,
  });
  return result;
}

// Function to delete a FAQ by ID
async function deleteFAQ(faqId: string) {
  const result = await sanityClient.delete(faqId);
  return result;
}

// Function to fetch all FAQs
async function getFAQs() {
  const data = await sanityClient.fetch('*[_type == "faq"]');
  return data;
}

// Function to update a FAQ
async function updateFAQ(_id: string, updatedData: FAQ) {
  const result = await sanityClient.patch(_id)
    .set(updatedData) 
    .commit(); 
  return result;
}

// Handle GET request to fetch FAQs
export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching FAQs', error }, { status: 500 });
  }
}

// Handle POST request to create FAQ
export async function POST(req: Request) {
  try {
    const newFAQ = await req.json();
    const createdFAQ = await createFAQ(newFAQ);
    return NextResponse.json(createdFAQ, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating FAQ', error }, { status: 500 });
  }
}

// Handle PUT request to update FAQ
// Handle PUT request to update FAQ
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body._id) {
      return NextResponse.json({ message: "Missing _id for FAQ update" }, { status: 400 });
    }

    // Update the FAQ document in Sanity using the provided _id
    const updatedFAQ = await sanityClient
      .patch(body._id)  // Use _id to target the document
      .set({ question: body.question, answer: body.answer })
      .commit();

    return NextResponse.json(updatedFAQ, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Failed to update FAQ", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

// Handle DELETE request to delete FAQ
export async function DELETE(req: Request) {
  try {
    const { faqId } = await req.json();
    const deletedFAQ = await deleteFAQ(faqId);
    return NextResponse.json({ message: 'FAQ deleted successfully', deletedFAQ });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting FAQ', error }, { status: 500 });
  }
}
