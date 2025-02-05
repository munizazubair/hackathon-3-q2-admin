
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetProductData } from "@/sanity/sanity.query";
// import { DataTableDemo } from "@/components/tabless";

export interface ProductInterface {
    _id: number;
    title: string;
    price: number;
    priceWithoutDiscount: number;
    badge: string;
    imageURL: string;
    products: number;
    description: string;
    inventory: number;
    tags: string;
    reviews: { reviewText: string; username: string }[];
    quantity: number;
    category: { _id: string, title: string, imageURL: string }
    status: string;
  }
  
  interface ProductFormData {
  title: string;
  price: number;
  priceWithoutDiscount: number;
  status: string;
  image: string;
}

export default function ProductForm() {
  const [productData, setProductData] = React.useState<ProductInterface[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [priceWithoutDiscount, setPriceWithoutDiscount] = React.useState<number>(0);
  const [status, setStatus] = React.useState<string>("unpublished");
  const [image, setImage] = React.useState<string>("");
  const [editingProduct, setEditingProduct] = React.useState<ProductInterface | null>(null);

  React.useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/addProduct');
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
      }
      fetchFAQs();
    };
    async function fetchProductData() {
      try {
        const data = await GetProductData();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProductData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ProductFormData = {  title, price, priceWithoutDiscount, status, image };
  
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = `/api/addProduct`;
  
      const body = editingProduct 
        ? JSON.stringify({ _id: editingProduct._id, updatedData: productData }) 
        : JSON.stringify(productData);
  
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });
  
      if (response.ok) {
        alert(editingProduct ? 'Product updated successfully' : 'Product added successfully');
        
        // Clear form fields after submission
        setTitle('');
        setPrice(0);
        setPriceWithoutDiscount(0);
        setImage('');
        setStatus('unpublished');
        
        // Update the product list if editing
        if (editingProduct) {
          // Directly update the state with the new product data
          setProductData((prevProducts) => 
            prevProducts.map((product) =>
              product._id === editingProduct._id ? { ...product, ...productData } : product
            )
          );
        }
        
        setEditingProduct(null);  // Reset the editing mode
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert('Error saving product');
    }
  };
  
  
  const handleEdit = (item: ProductInterface) => {
    setEditingProduct(item);
    setTitle(item.title);
    setPrice(item.price);
    setPriceWithoutDiscount(item.priceWithoutDiscount);
    setStatus(item.status);
    setImage(item.imageURL);  // Ensure image is set
  };

  
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/addProduct', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }), // Sending faqId for DELETE
      });

      if (response.ok) {
        setProductData(productData.filter((product: ProductInterface) => product._id !== Number(id)));  // Remove deleted FAQ from state
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete Product');
      }
    } catch (error) {
      console.error("Error deleting Product:", error);
      alert('Error deleting Product');
    }
  };

const [formVisible , setFormVisible] = React.useState<boolean>(false);
const handleFormVisible = () => {
  setFormVisible(formVisible => !formVisible)
}
const clearForm = () => {
  setTitle("");
  setPrice(0);
  setPriceWithoutDiscount(0);
  setStatus("unpublished");
  setImage("");
  setEditingProduct(null);
};

  return (    
  
    <div className="flex flex-col items-center justify-center w-full min-h-screen  bg-white  p-4">

      <div>{formVisible ?
       <Card className="my-8 w-[700px] max-w-md bg-white shadow-lg rounded-lg p-6">
       <CardHeader>
         <CardTitle className="text-[20px]">{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
       </CardHeader>
       <CardContent>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="flex flex-col space-y-2">
             <Label htmlFor="title">Title</Label>
             <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" required />
   
             <Label htmlFor="price">Price</Label>
             <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Product Price" required />
   
             <Label htmlFor="priceWithoutDiscount">Price Without Discount</Label>
             <Input id="priceWithoutDiscount" type="number" value={priceWithoutDiscount} onChange={(e) => setPriceWithoutDiscount(Number(e.target.value))} placeholder="Price Without Discount" required />
   
             <Label htmlFor="status">Status</Label>
             <Select value={status} onValueChange={(value:string) => setStatus(value)}>
               <SelectTrigger>
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="published">Published</SelectItem>
                 <SelectItem value="unpublished">Unpublished</SelectItem>
               </SelectContent>
             </Select>
   
             <Label htmlFor="image">Image URL</Label>
             <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
           </div>
           <div className="flex flex-col gap-2">
           <Button type="submit" className="w-full mt-4 bg-color12 hover:bg-color15 text-white rounded" onClick={() => {handleFormVisible(); clearForm();}}>Cancel</Button>
           <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded">{editingProduct ? "Update Product" : "Add Product"}</Button>
           </div>
         </form>
       </CardContent>
     </Card>
      : ""}</div>
    <section className="w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gray-100 shadow-lg rounded-lg ">
      <div className="w-full flex justify-between mb-1">
        <h1 className="text-lg lg:text-[24px] font-bold text-gray-800">Products</h1>
        <div onClick={handleFormVisible}>{formVisible ? ""  :<button className="bg-color16 rounded-[4px] h-[25px] w-[125px] text-[13px] lg:w-[160px] lg:h-[35px] text-white text-center">Add New product</button> }</div>
      </div>
      <div className="overflow-auto h-auto w-full flex justify-center items-center ">
        <div className="overflow-x-auto w-auto felx flex-col items-center justify-center ">
        <table className=" border border-gray-300 rounded-lg w-full min-w-max md:w-auto  flex flex-col items-center justify-center flex-nowrap overflow-auto">
          <thead>
            <tr className="bg-gray-800 text-white font-semibold sticky top-0 text-[12px] lg:text-[16px] text-center">
              <th className="py-1.5"><h1 className="w-[70px] lg:w-[100px]">Image</h1></th>
              <th className="py-1.5"><h1 className="w-[80px] lg:w-[120px]">Name</h1></th>
              <th className="py-1.5"><h1 className="w-[50px] lg:w-[65px]">Price</h1></th>
              <th className="py-1.5"><h1 className="w-[80px] lg:w-[95px]">Price Without Discount</h1></th>
              <th className="py-1.5"><h1 className="w-[200px] md:w-[220px] lg:w-[240px]">Description</h1></th>
              <th className="py-1.5"><h1 className="w-[70px] lg:w-[85px]">Status</h1></th>
              <th className="py-1.5"><h1 className="w-[65px] lg:w-[80px]">Inventory</h1></th>
              <th className="py-1.5"><h1 className="w-[50px] lg:w-[65px]">Badge</h1></th>
              <th className="py-1.5"><h1 className="w-[75px] lg:w-[85px]">Category</h1></th>
              <th className="py-1.5"><h1 className="w-[140px] lg:w-[180px]">Actions</h1></th>
            </tr>
          </thead>
          <tbody>
            {productData.map((item) => (
              <tr key={item._id} className="border-b border-gray-300 hover:bg-white text-center text-[10px] lg:text-[14px]">
                <td><div className="w-[70px] lg:w-[100px] text-center py-1"><img className="h-12 w-12 lg:h-[70px] lg:w-[70px] mx-auto rounded" src={item.imageURL} alt="product" /></div></td>
                <td className="font-semibold text-gray-700"><p className="w-[80px] lg:w-[120px] text-center">{item.title}</p></td>
                <td><p className="w-[50px] lg:w-[65px] text-center">${item.price}</p></td>
                <td><p className="w-[80px] lg:w-[95px] text-center">${item.priceWithoutDiscount}</p></td>
                <td><p className="w-[200px] lg:w-[240px] md:w-[220px] text-center">{item.description}</p></td>
                <td><p className="w-[70px] lg:w-[85px] text-center">{item.status}</p></td>
                <td><p className="w-[65px] lg:w-[80px] text-center">{item.inventory}</p></td>
                <td><p className="w-[50px] lg:w-[65px] text-center font-semibold text-[12px] lg:text-[16px]">{item.badge == "Sales" ? <div className="text-color8">{item.badge}</div> : <div className="text-color7">{item.badge}</div>}</p></td>
                <td><p className="w-[75px] lg:w-[85px] text-center">{item.category?.title || "No Category"}</p></td>
                
              <td className="flex items-center justify-center space-x-1 w-[140px] lg:w-[180px] mt-5">
                  <div onClick={() => {handleEdit(item); handleFormVisible()}}>{formVisible? "" : <button className="px-3 py-1 bg-color12 text-white rounded hover:bg-color15" >Edit</button>}</div>
                  <button className="px-3 py-1 bg-color12 text-white rounded hover:bg-color15" onClick={() => handleDelete(item._id.toString())}>Delete</button>
                </td>

              </tr>

            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  
 
  </div>
   
  );
}
