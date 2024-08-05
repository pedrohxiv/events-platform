"use client";

import { useDropzone } from "@uploadthing/react";
import Image from "next/image";
import { useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  disabled?: boolean;
}

export const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
  disabled,
}: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(URL.createObjectURL(acceptedFiles[0]));
    }, []),
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 outline-none",
        {
          "cursor-not-allowed opacity-50": disabled,
        }
      )}
    >
      {!disabled && <input {...getInputProps()} className="cursor-pointer" />}
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <Image
            src={imageUrl}
            height={250}
            width={250}
            alt="image"
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <Image
            src="/icons/upload.svg"
            height={77}
            width={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2">Drop file to upload</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button
            type="button"
            className="rounded-full disabled:opacity-100"
            disabled={disabled}
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};
