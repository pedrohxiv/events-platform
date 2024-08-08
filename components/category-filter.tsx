"use client";

import type { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllCategories } from "@/actions/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectCategory = (category: string) => {
    let url;

    if (category && category !== "All") {
      url = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      url = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(url, { scroll: false });
  };

  useEffect(() => {
    (async () => setCategories(await getAllCategories()))();
  }, []);

  return (
    <Select onValueChange={(value) => handleSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.name}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
