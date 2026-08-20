import React, {
    useState,
    useEffect
} from "react";

import {
    Navigate,
    useParams
} from "react-router";

import "../style/interview.scss";

import { useInterview } from "../hooks/useInterview.js";


const Interview = () => {

    const { interviewId } = useParams();

    const {
        report,
        loading,
        generateReportById
    } = useInterview();


    const [activeSection, setActiveSection] =
        useState("technical");

    const [openQuestion, setOpenQuestion] =
        useState(null);


    // =====================================
    // FETCH REPORT
    // =====================================

    useEffect(() => {

        if (interviewId) {

            generateReportById({
                interviewId
            });

        }

    }, [interviewId]);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <main className="interview-page">

                <h1>
                    Loading Interview Report...
                </h1>

            </main>
        );

    }


    // =====================================
    // NO REPORT
    // =====================================

    if (!report) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    // =====================================
    // QUESTION TOGGLE
    // =====================================

    const toggleQuestion = (index) => {

        setOpenQuestion(
            openQuestion === index
                ? null
                : index
        );

    };


    // =====================================
    // TECHNICAL QUESTIONS
    // =====================================

    const technicalQuestions =
        report.technicalquestion || [];


    // =====================================
    // BEHAVIOURAL QUESTIONS
    // =====================================

    const behaviouralQuestions =
        report.behaviouralquestion || [];


    // =====================================
    // SKILL GAPS
    // =====================================

    const skillGaps =
        report.skillGaps || [];


    // =====================================
    // PREPARATION PLAN
    // =====================================

    const preparationPlan =
        report.preparationPlan || [];


    return (

        <main className="interview-page">


            {/* =========================================
                LEFT SIDEBAR
            ========================================= */}

            <aside className="interview-sidebar">

                <div className="sidebar-title">
                    SECTIONS
                </div>


                {/* TECHNICAL */}

                <button
                    className={`sidebar-item ${
                        activeSection === "technical"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => {

                        setActiveSection("technical");

                        setOpenQuestion(null);

                    }}
                >

                    <span className="sidebar-icon">
                        &lt;/&gt;
                    </span>

                    <span>
                        Technical Questions
                    </span>

                </button>


                {/* BEHAVIOURAL */}

                <button
                    className={`sidebar-item ${
                        activeSection === "behavioral"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => {

                        setActiveSection("behavioral");

                        setOpenQuestion(null);

                    }}
                >

                    <span className="sidebar-icon">
                        □
                    </span>

                    <span>
                        Behavioral Questions
                    </span>

                </button>


                {/* ROADMAP */}

                <button
                    className={`sidebar-item ${
                        activeSection === "roadmap"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => {

                        setActiveSection("roadmap");

                        setOpenQuestion(null);

                    }}
                >

                    <span className="sidebar-icon">
                        ◇
                    </span>

                    <span>
                        Road Map
                    </span>

                </button>

            </aside>



            {/* =========================================
                CENTER CONTENT
            ========================================= */}

            <section className="interview-content">


                {/* =====================================
                    TECHNICAL QUESTIONS
                ===================================== */}

                {activeSection === "technical" && (

                    <>

                        <div className="content-header">

                            <div>

                                <h1>
                                    Technical Questions
                                </h1>

                                <span className="question-count">

                                    {technicalQuestions.length}
                                    {" "}questions

                                </span>

                            </div>

                        </div>


                        <div className="questions-list">

                            {technicalQuestions.length === 0 ? (

                                <p>
                                    No technical questions available.
                                </p>

                            ) : (

                                technicalQuestions.map(
                                    (question, index) => (

                                        <div
                                            className={`question-card ${
                                                openQuestion === index
                                                    ? "open"
                                                    : ""
                                            }`}

                                            key={index}
                                        >

                                            <button
                                                className="question-button"

                                                onClick={() =>
                                                    toggleQuestion(index)
                                                }
                                            >

                                                <span className="question-number">
                                                    Q{index + 1}
                                                </span>


                                                <span className="question-text">
                                                    {question.question}
                                                </span>


                                                <span
                                                    className={`question-arrow ${
                                                        openQuestion === index
                                                            ? "rotated"
                                                            : ""
                                                    }`}
                                                >
                                                    ⌄
                                                </span>

                                            </button>


                                            {openQuestion === index && (

                                                <div className="question-answer">

                                                    <div className="answer-label">
                                                        INTERVIEW FOCUS
                                                    </div>


                                                    <p>

                                                        <strong>
                                                            Why they ask:
                                                        </strong>

                                                        {" "}

                                                        {question.intention}

                                                    </p>


                                                    <p>

                                                        <strong>
                                                            How to answer:
                                                        </strong>

                                                        {" "}

                                                        {question.answer}

                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </>

                )}



                {/* =====================================
                    BEHAVIOURAL QUESTIONS
                ===================================== */}

                {activeSection === "behavioral" && (

                    <>

                        <div className="content-header">

                            <div>

                                <h1>
                                    Behavioral Questions
                                </h1>

                                <span className="question-count">

                                    {behaviouralQuestions.length}
                                    {" "}questions

                                </span>

                            </div>

                        </div>


                        <div className="questions-list">

                            {behaviouralQuestions.length === 0 ? (

                                <p>
                                    No behavioral questions available.
                                </p>

                            ) : (

                                behaviouralQuestions.map(
                                    (question, index) => (

                                        <div
                                            className={`question-card ${
                                                openQuestion === index
                                                    ? "open"
                                                    : ""
                                            }`}

                                            key={index}
                                        >

                                            <button
                                                className="question-button"

                                                onClick={() =>
                                                    toggleQuestion(index)
                                                }
                                            >

                                                <span className="question-number">
                                                    Q{index + 1}
                                                </span>


                                                <span className="question-text">
                                                    {question.question}
                                                </span>


                                                <span
                                                    className={`question-arrow ${
                                                        openQuestion === index
                                                            ? "rotated"
                                                            : ""
                                                    }`}
                                                >
                                                    ⌄
                                                </span>

                                            </button>


                                            {openQuestion === index && (

                                                <div className="question-answer">

                                                    <div className="answer-label">
                                                        INTERVIEW FOCUS
                                                    </div>


                                                    <p>

                                                        <strong>
                                                            Why they ask:
                                                        </strong>

                                                        {" "}

                                                        {question.intention}

                                                    </p>


                                                    <p>

                                                        <strong>
                                                            How to answer:
                                                        </strong>

                                                        {" "}

                                                        {question.answer}

                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </>

                )}



                {/* =====================================
                    PREPARATION ROADMAP
                ===================================== */}

                {activeSection === "roadmap" && (

                    <>

                        <div className="content-header">

                            <div>

                                <h1>
                                    Preparation Road Map
                                </h1>

                                <span className="question-count">

                                    {preparationPlan.length}
                                    {" "}days

                                </span>

                            </div>

                        </div>


                        <div className="roadmap-list">

                            {preparationPlan.map(
                                (plan, index) => (

                                    <div
                                        className="roadmap-card"
                                        key={index}
                                    >

                                        <div className="day-badge">

                                            Day {plan.day}

                                        </div>


                                        <div className="roadmap-content">

                                            <h3>
                                                {plan.focus}
                                            </h3>


                                            <ul>

                                                {plan.tasks?.map(
                                                    (task, taskIndex) => (

                                                        <li
                                                            key={taskIndex}
                                                        >
                                                            {task}
                                                        </li>

                                                    )
                                                )}

                                            </ul>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </>

                )}

            </section>



            {/* =========================================
                RIGHT SIDEBAR
            ========================================= */}

            <aside className="score-sidebar">


                <div className="score-title">
                    MATCH SCORE
                </div>


                {/* SCORE */}

                <div className="score-circle">

                    <div className="score-value">

                        {report.matchScore}

                    </div>

                    <div className="score-percent">
                        %
                    </div>

                </div>


                {/* MESSAGE */}

                <div className="score-message">

                    {report.matchScore >= 80

                        ? "Strong match for this role"

                        : report.matchScore >= 60

                            ? "Good match for this role"

                            : "Needs improvement for this role"

                    }

                </div>



                {/* JOB TITLE */}

                <div className="summary-section">

                    <div className="summary-title">
                        TARGET ROLE
                    </div>

                    <p>
                        {report.title}
                    </p>

                </div>



                {/* SKILL GAPS */}

                <div className="skill-section">

                    <div className="skill-title">
                        SKILL GAPS
                    </div>


                    <div className="skill-list">

                        {skillGaps.length === 0 ? (

                            <p>
                                No major skill gaps found.
                            </p>

                        ) : (

                            skillGaps.map(
                                (skill, index) => (

                                    <div
                                        className={`skill-tag skill-${index % 3}`}
                                        key={index}
                                    >

                                        <span>
                                            {skill.skill}
                                        </span>

                                        <small>
                                            {skill.severity}
                                        </small>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>


            </aside>


        </main>

    );

};


export default Interview;