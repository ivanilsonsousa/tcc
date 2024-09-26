import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ModalPosition, positionClasses } from "./positions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  position?: ModalPosition;
  positionClass?: string;
  staticBackdrop?: boolean;
}

export const ConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirmação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  position = "center",
  positionClass,
  staticBackdrop = false,
}: ConfirmModalProps) => {
  const [classPosition, setClassPosition] = useState("");

  useEffect(() => {
    const modalPositionClasses = positionClass
      ? positionClass
      : positionClasses[position];

    setClassPosition(modalPositionClasses);
  }, [position, positionClasses]);

  const handleInteractOutside = (event: any) => {
    if (staticBackdrop) {
      event.preventDefault();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal>
        <AlertDialogOverlay
          onClick={handleInteractOutside}
        >
          <AlertContent
            className={cn(classPosition)}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{cancelText}</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
              >
                {confirmText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertContent>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
