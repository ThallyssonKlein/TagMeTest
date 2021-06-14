import { createContext, useState } from "react";

export const ChecksContext = createContext();

export default function ChecksContextProvider({ children }) {
    const [checkedIngredients, setCheckedIngredients] = useState({});
    const [checkedSteps, setCheckedSteps] = useState({});

    return (
        <ChecksContext.Provider value={{ checkedIngredients, setCheckedIngredients, checkedSteps, setCheckedSteps }}>
            {children}
        </ChecksContext.Provider>
    );
}