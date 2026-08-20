import axios from "axios";


const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials: true,
})

export const generateinterviewReport = async ({
    jobDescription,
    selfDescription,
    resumefile
}) => {
    try {
        const formData = new FormData();

        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);

        if (resumefile) {
            formData.append("resume", resumefile);
        }

        console.log("jobDescription:", jobDescription);
        console.log("selfDescription:", selfDescription);
        console.log("resume:", resumefile);

        const response = await api.post(
            "/api/interview",
            formData
        );

        return response.data;

    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("BACKEND ERROR:", error.response?.data);
        throw error;
    }
};


export const getinterviewReportById = async ({ interviewId }) => {
    const response = await api.get(
        `/api/interview/${interviewId}`
    );

    return response.data;
};

export const getallinterviewReports = async () => {
    const response = await api.get("/api/interview")

    return response.data
}