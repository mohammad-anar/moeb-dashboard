"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { MyModal } from "../shared/MyModal";
import { ProductCard } from "../cards/ProductCard";
import image1 from "@/assets/product1.png";

interface Stats {
  id: string;
  seller: {
    name: string;
    email: string;
  };
  status: "Sold" | "Not Sold";
  productName: string;
  price: number;
}

interface ProductsTableProps {
  stats?: Stats[];
  handleSuspend: (id: string) => void;
  handleView: (id: string) => void;
}

const tableHeaders = ["Seller", "Status", "Product Name", "Price", "Actions"];

const defaultStats: Stats[] = [
  {
    id: "1",
    seller: { name: "John", email: "john@gmail.com" },
    status: "Sold",
    productName: "Smart Phone",
    price: 1200,
  },
  {
    id: "2",
    seller: { name: "Alice", email: "alice@gmail.com" },
    status: "Not Sold",
    productName: "Laptop",
    price: 1800,
  },
  {
    id: "3",
    seller: { name: "Bob", email: "bob@gmail.com" },
    status: "Sold",
    productName: "Tablet",
    price: 600,
  },
  {
    id: "4",
    seller: { name: "Eve", email: "eve@gmail.com" },
    status: "Sold",
    productName: "Smart Watch",
    price: 250,
  },
  {
    id: "5",
    seller: { name: "David", email: "david@gmail.com" },
    status: "Not Sold",
    productName: "Camera",
    price: 900,
  },
  {
    id: "6",
    seller: { name: "Sophia", email: "sophia@gmail.com" },
    status: "Sold",
    productName: "Headphones",
    price: 150,
  },
  {
    id: "7",
    seller: { name: "Michael", email: "michael@gmail.com" },
    status: "Sold",
    productName: "Gaming Console",
    price: 500,
  },
  {
    id: "8",
    seller: { name: "Olivia", email: "olivia@gmail.com" },
    status: "Not Sold",
    productName: "Monitor",
    price: 300,
  },
  {
    id: "9",
    seller: { name: "James", email: "james@gmail.com" },
    status: "Sold",
    productName: "Keyboard",
    price: 80,
  },
  {
    id: "10",
    seller: { name: "Emma", email: "emma@gmail.com" },
    status: "Sold",
    productName: "Mouse",
    price: 40,
  },
  {
    id: "11",
    seller: { name: "Liam", email: "liam@gmail.com" },
    status: "Not Sold",
    productName: "Printer",
    price: 200,
  },
  {
    id: "12",
    seller: { name: "Ava", email: "ava@gmail.com" },
    status: "Sold",
    productName: "Scanner",
    price: 150,
  },
  {
    id: "13",
    seller: { name: "Noah", email: "noah@gmail.com" },
    status: "Sold",
    productName: "Drone",
    price: 1200,
  },
  {
    id: "14",
    seller: { name: "Isabella", email: "isabella@gmail.com" },
    status: "Not Sold",
    productName: "Speaker",
    price: 100,
  },
  {
    id: "15",
    seller: { name: "William", email: "william@gmail.com" },
    status: "Sold",
    productName: "External HDD",
    price: 120,
  },
  {
    id: "16",
    seller: { name: "Mia", email: "mia@gmail.com" },
    status: "Sold",
    productName: "SSD",
    price: 150,
  },
  {
    id: "17",
    seller: { name: "Alexander", email: "alex@gmail.com" },
    status: "Not Sold",
    productName: "Router",
    price: 90,
  },
  {
    id: "18",
    seller: { name: "Charlotte", email: "charlotte@gmail.com" },
    status: "Sold",
    productName: "Projector",
    price: 600,
  },
  {
    id: "19",
    seller: { name: "Henry", email: "henry@gmail.com" },
    status: "Sold",
    productName: "VR Headset",
    price: 400,
  },
  {
    id: "20",
    seller: { name: "Amelia", email: "amelia@gmail.com" },
    status: "Not Sold",
    productName: "Microphone",
    price: 80,
  },
];

export function MarketplaceTable({
  stats = defaultStats,
  handleView,
  handleSuspend,
}: ProductsTableProps) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    id: 1,
    image: image1,
    title: "Professional Car Tiers",
    price: 25,
    rating: 5.0,
    status: "New",
  });
  return (
    <div className="space-y-6  rounded-xl">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {tableHeaders.map((title, idx) => (
                <TableHead
                  key={title}
                  className={`text-gray-700 font-semibold text-sm px-4 py-3 ${
                    idx === 0 ? "text-left" : "text-center"
                  }`}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {stats.map((product) => (
              <TableRow
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Seller Name */}
                <TableCell className="px-4 py-3 text-left">
                  {product.seller.name}
                </TableCell>

                {/* Status */}
                <TableCell className="px-4 py-3 text-center">
                  <Badge
                    className={
                      product.status === "Sold"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                    variant="outline"
                  >
                    {product.status}
                  </Badge>
                </TableCell>

                {/* Product Name */}
                <TableCell className="px-4 py-3 text-center text-gray-700">
                  {product.productName}
                </TableCell>

                {/* Price */}
                <TableCell className="px-4 py-3 text-center text-gray-700">
                  ${product.price}
                </TableCell>

                {/* Actions */}
                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      className="bg-blue-700 cursor-pointer"
                      onClick={() => {
                        handleView(product.id);
                        setOpen(!open);
                      }}
                    >
                      <IconEye size={16} />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-red-700 cursor-pointer"
                      onClick={() => handleSuspend(product.id)}
                    >
                      <IconTrash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MyModal open={open} onOpenChange={setOpen}>
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          rating={product.rating}
          status={product.status}
        />
      </MyModal>
    </div>
  );
}
