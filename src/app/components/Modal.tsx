"use client";
import { Toaster, toast } from "sonner";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Progress,
} from "@nextui-org/react";
import { useCoverImage } from "../hooks/upload-image-cover";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { Image as NextUiImage } from "@nextui-org/react";

import { formatFileSize } from "@edgestore/react/utils";
import { api } from "../../../convex/_generated/api";
import { getImageSize, useImageSize } from "react-image-size";

interface UploadeFile {
  url: string;
  thumbnailUrl: string | null;
  size: number;
  uploadedAt: Date;
  metadata: Record<string, never>;
  path: Record<string, never>;
  pathOrder: string[];
}

export default function CoverImageModal() {
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const createPost = useMutation(api.documents.createPost);

  const [preview, setPreview] = React.useState<string | undefined>();

  const [file, setFile] = React.useState<File>();
  const [value, setValue] = React.useState(0);
  const [uploadedFile, setUploadedFile] = React.useState<UploadeFile | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!coverImage.isOpen) {
      setFile(undefined);
      setValue(0);
      setUploadedFile(null);
      setLoading(false);
      setPreview(undefined);
    }
  }, [coverImage.isOpen]);

  const uploadCoverImage = useCallback(async () => {
    if (file) {
      setLoading(true);
      const res = await edgestore.publicImages.upload({
        file,
        onProgressChange: (progress) => {
          setValue(progress);
        },
      });
      const dimensions = await getImageSize(res.url);

      const promise = createPost({
        title: "First post",
        coverImage: res.url,
        width: dimensions.width,
        height: dimensions.height,
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: (data) => {
          console.log(data);

          return "Everything went smoothly.";
        },
        error: "there was an error while storing",
      });

      setLoading(false);

      coverImage.onClose();
    }
  }, [file, edgestore.publicImages]);

  useEffect(() => {
    const resetValue = () => {
      if (value === 100) {
        setTimeout(() => {
          setValue(0);
        }, 1200);
      }
    };

    value > 0 && resetValue();
  }, [value]);

  return (
    <>
      <Modal
        isOpen={coverImage.isOpen}
        onOpenChange={coverImage.onClose}
        isDismissable={false}
        hideCloseButton={loading}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Post
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <div className="flex items-center w-full justify-center flex-col space-y-2">
                    <Button color="secondary" disabled={loading}>
                      <label htmlFor="uploadImage" className="cursor-pointer">
                        Choose Image
                      </label>
                    </Button>
                    <input
                      id="uploadImage"
                      accept="images/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setFile(e.target.files?.[0]);
                        setPreview(URL.createObjectURL(e.target.files![0]));
                      }}
                    />
                    {preview && (
                      <div className="flex flex-col">
                        <div className="relative">
                          <NextUiImage
                            isBlurred
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            alt="preview"
                            src={preview}
                          ></NextUiImage>
                          <span className="absolute top-4 text-center font-semibold p-2 text-black z-50 bg-slate-300/70 items-center w-full">
                            Preview
                          </span>
                        </div>
                      </div>
                    )}
                    {value > 0 && (
                      <Progress
                        aria-label="Uploading..."
                        size="md"
                        value={value}
                        color="success"
                        showValueLabel={true}
                        className="max-w-md"
                      />
                    )}
                  </div>

                  {uploadedFile?.url && (
                    <div className="my-3">
                      <span className="items-center flex justify-center font-semibold text-neutral-500">
                        Successfully uploaded!
                        <span className="text-sm text-neutral-400">
                          ({`${formatFileSize(uploadedFile.size)}`})
                        </span>
                      </span>
                      <NextUiImage
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        alt="uploadedFile"
                        src={uploadedFile.url}
                      ></NextUiImage>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                {uploadedFile?.url && (
                  <Button
                    color="danger"
                    variant="light"
                    onClick={coverImage.onClose}
                  >
                    Close
                  </Button>
                )}
                {!uploadedFile?.url && (
                  <Button
                    color="danger"
                    variant="light"
                    onClick={uploadCoverImage}
                    isDisabled={loading}
                  >
                    Upload
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
