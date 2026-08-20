import React, { useState  , useRef} from "react";
import "../style/home.scss";
import {useInterview} from "../hooks/useInterview.js" 
import { Navigate, useNavigate } from "react-router";
const Home = () => {
    const navigate = useNavigate()
    const {loading , generateReport} = useInterview()
    const [jobDescription, setjobDescription] = useState("")
    const [selfDescription, setselfDescription] = useState("")
    const resumInputref = useRef()
    const [resume, setResume] = useState(null);
     const [resumeError, setResumeError] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const maxSize = 3 * 1024 * 1024;

    if (file.size > maxSize) {
      setResumeError("Resume size must be less than 3 MB.");
      setResume(null);
      e.target.value = "";
      return;
    }

    setResumeError("");
    setResume(file);
  };

  const handleresumeReport= async () =>{
    try {
      
      const resumefile = resumInputref.current.files[0]
      const data = await generateReport({jobDescription , selfDescription , resumefile})
      if (!data || !data._id) {
      console.error("generateReport did not return an _id", data);
      return;
    }
      navigate(`/interview/${data._id}`)
    } catch (error) {
      console.error("Error generating report:", error);
      
    }
    }

  if(loading){
    return (
      <main>
        <h1>Loading your Interview Plan ...</h1>
      </main>
    )
  }

  return (
    <main className="home">
      <div className="interview_group">

        {/* ================= LEFT ================= */}

        <div className="left">

          <div className="card-header">
            <div className="header-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="6" width="18" height="15" rx="2" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
              </svg>
            </div>

            <label htmlFor="jobDescription">
              Job Description
            </label>
          </div>

          <div className="job-description-box">
            <textarea
              onChange={(e) =>setjobDescription(e.target.value)}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the complete job description here... Include requirements, responsibilities, and company details."
            />
          </div>

        </div>


        {/* ================= RIGHT ================= */}

        <div className="right">

          {/* -------- Resume -------- */}

          <div className="resume-card">

            <div className="card-header resume-header">

              <div className="header-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="7" r="3" />
                  <path d="M5 20c0-3.5 2.7-6 7-6s7 2.5 7 6" />
                </svg>
              </div>

              <span>Resume</span>

              <small className="required">
                REQUIRED FOR BEST
                <br />
                RESULTS
              </small>

            </div>


            {/* RESUME UPLOAD */}

            <label
              className={`upload-box ${resume ? "file-selected" : ""}`}
              htmlFor="resume"
            >

              {!resume ? (
                <>
                  <div className="upload-icon">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 16V4" />
                      <path d="m7 9 5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>

                  </div>

                  <strong>
                    Click to upload or drag and drop
                  </strong>

                  <span>
                    PDF up to 3MB
                  </span>
                  {resumeError && (
                    <span className="upload-error">
                        {resumeError}
                    </span>
                    )}
                </>
              ) : (
                <>

                  <div className="file-success-icon">
                    ✓
                  </div>

                  <strong>
                    Resume Uploaded
                  </strong>

                  <span className="file-name">
                    {resume.name}
                  </span>

                  <span>
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </span>

                </>
              )}

            </label>

            <input ref={resumInputref}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              onChange={handleResumeChange}
            />

          </div>


          {/* -------- Self Description -------- */}

          <div className="self-card">

            <div className="card-header">

              <div className="header-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 5h16v12H8l-4 4V5Z" />
                </svg>

              </div>

              <label htmlFor="selfDescription">
                Self Description
              </label>

            </div>


            <textarea
              onChange={(e) =>{setselfDescription(e.target.value)}}
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe your background, key strengths, and what makes you a great fit for this role..."
            />

          </div>


          {/* -------- Generate Button -------- */}

          <button
            onClick={handleresumeReport}
            type="button"
            className="primary_button"
          >
            <span className="sparkle">
              ✦
            </span>

            Generate Interview Report
          </button>

        </div>

      </div>
    </main>
  );
};

export default Home;