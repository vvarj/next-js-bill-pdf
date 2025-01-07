"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Product {
  name: string;
  quantity: string;
  price: string;
  total: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState({ name: "", quantity: "", price: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (product.name && product.quantity && product.price) {
      setProducts([
        ...products,
        {
          ...product,
          total: parseFloat(product.quantity) * parseFloat(product.price),
        },
      ]);
      setProduct({ name: "", quantity: "", price: "" });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Bill Invoice", 14, 10);

    autoTable(doc, {
      startY: 20,
      head: [["Product Name", "Quantity", "Price", "Total"]],
      body: products.map((prod) => [
        prod.name,
        prod.quantity,
        prod.price,
        prod.total.toFixed(2),
      ]),
    });

    const grandTotal = products.reduce((sum, prod) => sum + prod.total, 0);
    doc.text(
      `Grand Total: Rs.${grandTotal.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("bill.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Generate Bill
      </h1>

      {/* Form to Add Product */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
            className="border p-3 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="border p-3 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
            className="border p-3 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-8">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{prod.name}</td>
                <td className="border px-4 py-2">{prod.quantity}</td>
                <td className="border px-4 py-2">{prod.price}</td>
                <td className="border px-4 py-2">{prod.total.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={3}
                className="border px-4 py-2 font-bold text-right bg-gray-100"
              >
                Grand Total
              </td>
              <td className="border px-4 py-2 font-bold bg-gray-100">
                ₹
                {products.reduce((sum, prod) => sum + prod.total, 0).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Generate PDF Button */}
      <div className="text-center">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-green-700 focus:ring focus:ring-green-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
