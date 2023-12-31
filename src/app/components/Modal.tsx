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
  Spinner,
} from "@nextui-org/react";
import { useCoverImage } from "../hooks/upload-image-cover";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { Image as NextUiImage } from "@nextui-org/react";

import { api } from "../../../convex/_generated/api";
import { getImageSize } from "react-image-size";
import { v4 as uuidv4 } from "uuid";

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
        title: "Post_" + uuidv4(),
        coverImage: res.url,
        width: dimensions.width,
        height: dimensions.height,
        likesId: [],
        follower: [],
        hasChecked: false,
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: (data) => {
          return "Everything went smoothly.";
        },
        error: "there was an error while storing",
      });

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
        placement="center"
        isOpen={coverImage.isOpen}
        onOpenChange={coverImage.onClose}
        isDismissable={false}
        hideCloseButton={loading}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                Post new Image
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <div className="flex items-center w-full justify-center flex-col space-y-2">
                    {!loading && (
                      <Button color="secondary" disabled={loading}>
                        <label htmlFor="uploadImage" className="cursor-pointer">
                          Choose Image
                        </label>
                      </Button>
                    )}
                    <input
                      id="uploadImage"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setFile(e.target.files?.[0]);
                        setPreview(URL.createObjectURL(e.target.files![0]));
                      }}
                    />
                    {preview && (
                      <div className="flex flex-col relative">
                        <div className="relative">
                          <NextUiImage
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                            alt="preview"
                            src={preview}
                          ></NextUiImage>
                          <span className="absolute top-4 text-center font-semibold p-2 text-black z-50 bg-slate-300/70 items-center w-full">
                            Preview
                          </span>
                          {loading && (
                            <div className="absolute top-0 w-full z-50 h-full flex items-center justify-center">
                              <Spinner size="lg"></Spinner>
                            </div>
                          )}
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
                {!uploadedFile?.url && preview && (
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
