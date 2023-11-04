import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDeletePost } from "../hooks/delete-post";
import { type } from "os";

type DELETE = {
  deletePostFunktion: () => void;
};

export default function DeleteModal({ deletePostFunktion }: DELETE) {
  const deletePost = useDeletePost();

  return (
    <>
      <Modal
        isOpen={deletePost.isOpen}
        onOpenChange={deletePost.onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="flex items-center justify-center p-8 font-semibold">
                  Post wirklich löschen?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={deletePost.onClose}
                >
                  Close
                </Button>
                <Button color="primary" onPress={deletePostFunktion}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
