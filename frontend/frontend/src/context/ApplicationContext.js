import { createContext, useState } from "react";

export const ApplicationContext = createContext();

export default function ApplicationContextProvider({ children }) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    return (
        <ApplicationContext.Provider value={{ selectedOrder, setSelectedOrder }}>
            {children}
        </ApplicationContext.Provider>
    );
}