import { NextResponse } from 'next/server';
import sanityClient from '@/sanity/sanity.client';
import { ProductInterface } from '@/app/(admin)/product-add/page';

async function createProduct(newProduct: ProductInterface) {
  try {
    const result = await sanityClient.create({
      _type: 'products',
      _id: newProduct._id,
      title: newProduct.title,
      price: newProduct.price,
      priceWithoutDiscount: newProduct.priceWithoutDiscount,
      image: newProduct.imageURL,
      status: newProduct.status,
      badge: newProduct.badge,
      inventory: newProduct.inventory,
      category: newProduct.category,
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

async function deleteProduct(productId: string) {
  try {
    const result = await sanityClient.delete(productId);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

async function getProducts() {
  try {
    const data = await sanityClient.fetch('*[_type == "products"]');
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

async function updateProduct(_id: string, updateProduct: ProductInterface) {
  try {
    const result = await sanityClient
      .patch(_id)
      .set(updateProduct)  
      .commit();  
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    const createdProduct = await createProduct(newProduct);
    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { _id, updatedData } = await req.json();
    const updatedProduct = await updateProduct(_id, updatedData);
    return NextResponse.json(updatedProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { productId } = await req.json();
    const deletedProduct = await deleteProduct(productId);
    return NextResponse.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}
