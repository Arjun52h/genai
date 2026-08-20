import {createContext, useState} from "react";

export const InterviewContext = createContext()

export const InterviewProvider = ({children}) =>{

    const [loading, setloading] = useState(false)
    const [report, setreport] = useState(null)
    const [reportlist, setreportlist] = useState([])

    return (
        <InterviewContext.Provider value= {{loading ,setloading,report,setreport , reportlist ,setreportlist}}>
            {children}
        </InterviewContext.Provider>
    )
}