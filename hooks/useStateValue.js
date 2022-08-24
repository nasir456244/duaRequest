import { createContext, useContext, useState } from "react"

const State = createContext()

export const StateProvider = ({ children }) => {
    const [changeState, setChangeState] = useState({
        prayer: false,
        comment: false
    })
    return (
        <State.Provider value={{
            changeState, setChangeState
        }}>
            {children}
        </State.Provider>
    )
}
const useStateValue = () => useContext(State)
export default useStateValue