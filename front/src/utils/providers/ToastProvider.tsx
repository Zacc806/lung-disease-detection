import { ReactNode, createContext, useContext } from 'react'
import { useToast } from '@chakra-ui/react'

type ToastContextType = {
    success: (message: string) => void
    error: (message: string) => void
    loading: (promise: Promise<{ message: string }>) => void
}
const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const toast = useToast()

    const success = (message: string) => {
        toast({
            title: 'Success',
            description: message,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const error = (message: string) => {
        toast({
            title: 'Success',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    const loading = (promise: Promise<{ message: string }>) => {
        toast({
            title: 'Loading...',
            description: 'Please wait',
            status: 'info',
            duration: null,
            isClosable: true,
        })

        promise
            .then((response) => {
                toast.closeAll()
                toast({
                    title: 'Success!',
                    description: response.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast.closeAll()
                toast({
                    title: 'Something went wrong',
                    description: error.response.data.message || 'Error',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }

    return (
        <ToastContext.Provider value={{ success, error, loading }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useNotify = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useNotify must be used within a ToastProvider')
    }
    return context
}
