import { createContext, useContext, useEffect, useState } from "react"

export type Storage = {
    reserved: string
}

export interface StorageContext {
    items: Storage,
    setItems: React.Dispatch<React.SetStateAction<Storage>>

}

const StorageContext = createContext<StorageContext | undefined>(undefined)

export default function StorageContextProvider({ children }: { children: React.ReactNode }) {

    const [items, setItems] = useState<Storage>(() => {
        const reserved = localStorage.getItem('reserved') || '';
        return { reserved }
    })

    useEffect(() => {
        localStorage.setItem('reserved', items.reserved)
    }, [items.reserved])

    return (
        <StorageContext.Provider value={{ items, setItems }}>
            {children}
        </StorageContext.Provider>
    )
}

export function useStorage() {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('useStorage must be used within StorageProvider');
    }
    return context;
}