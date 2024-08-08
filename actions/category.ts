"use server";

import { db } from "@/lib/db";

interface CreateCategoryProps {
  name: string;
}

export const createCategory = async ({ name }: CreateCategoryProps) => {
  try {
    const category = await db.category.create({
      data: {
        name,
      },
    });

    return category;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await db.category.findMany();

    return categories;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

export const getCategoryByName = async (name: string) => {
  try {
    const category = await db.category.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return category;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};
