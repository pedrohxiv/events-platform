import type { Category } from "@prisma/client";
import { useEffect, useState } from "react";

import { createCategory, getAllCategories } from "@/actions/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  disabled?: boolean;
  onChangeHandler?: (value: string) => void;
  value?: string;
}

export const Dropdown = ({ disabled, onChangeHandler, value }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await createCategory({ name: newCategory.trim() }).then((category) =>
      setCategories((prev) => [...prev, category])
    );

    setIsOpen(false);
  };

  useEffect(() => {
    (async () => setCategories(await getAllCategories()))();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger
        className={cn("select-field", {
          "text-grey-500": !value,
        })}
        disabled={disabled}
      >
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Create Category
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
              <DialogDescription className="p-regular-16 text-grey-600">
                Create a category for your event.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCategory}>
              <Input
                type="text"
                placeholder="Category name"
                className="input-field mt-3"
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </SelectContent>
    </Select>
  );
};
