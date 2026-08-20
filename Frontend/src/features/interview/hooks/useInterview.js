import {generateinterviewReport , getallinterviewReports ,getinterviewReportById} from "../services/interview.api" 

import { useContext } from "react" 
import  {InterviewContext} from "../interview.context"


// custom hooks 
export const useInterview = () =>{

    const context = useContext(InterviewContext)
    if(!context){
        throw new Error("useInterview  must be used within an InterviewProvider")
    }

    const {loading , setloading ,report , setreport , reportlist , setreportlist} = context

const generateReport = async ({ jobDescription, selfDescription, resumefile }) => {
  setloading(true);
  
  try {
    const response = await generateinterviewReport({ jobDescription, selfDescription, resumefile });

    if (response && response.interviewReport) {
      setreport(response.interviewReport);
      return response.interviewReport;
    } else {
      console.error("No interviewReport in response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error generating report:", error);
    return null;
  } finally {
    setloading(false);
  }
};


    const generateReportById = async ({interviewId}) => {
        setloading(true)
        
        try {
            const response = await getinterviewReportById({interviewId})
            setreport(response.interviewReport)
            return response.interviewReport;
        } catch (error) {
            console.log(error);
        }
        finally{
            setloading(false)
        }
     
    }

    const generatereports = async () =>{
        setloading(true)
        
        try {
            const response = await getallinterviewReports()
            setreportlist(response.interviewReport)
            return response.interviewReport;
        } catch (error) {
            console.log(error);
        }
        finally{
            setloading(false)
        }
        
    }

    return {loading , report , reportlist , generateReport , generateReportById , generatereports }

}