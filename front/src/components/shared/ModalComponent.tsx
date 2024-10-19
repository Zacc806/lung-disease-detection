import {
    Modal,
    ModalContent,
    ModalOverlay
} from "@chakra-ui/react";

export default function ModalComponent({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent
                background='none'
                maxW='fit-content'
                overflow='hidden'
            >
                {children}
            </ModalContent>
        </Modal>
    )
}