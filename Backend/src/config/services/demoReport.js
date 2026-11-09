const demoReport = {
    matchScore: 85,
    title: "Software Engineer",

    technicalquestion: [
        {
            question: "What is the difference between let, const and var in JavaScript?",
            intention: "To test JavaScript fundamentals.",
            answer: "Explain scope, reassignment, redeclaration and hoisting."
        },
        {
            question: "What is the difference between React props and state?",
            intention: "To check React fundamentals.",
            answer: "Props are passed from parent components, while state is managed within a component."
        },
        {
            question: "What is middleware in Express.js?",
            intention: "To evaluate backend knowledge.",
            answer: "Middleware functions execute during the request-response cycle and can access req, res and next."
        },
        {
            question: "What is the difference between SQL and NoSQL databases?",
            intention: "To test database fundamentals.",
            answer: "Explain relational tables, schemas, document storage and common use cases."
        },
        {
            question: "What is a REST API?",
            intention: "To assess API development knowledge.",
            answer: "Explain REST principles, HTTP methods, endpoints and status codes."
        },
        {
            question: "What is JWT authentication?",
            intention: "To evaluate authentication knowledge.",
            answer: "Explain token creation, signing, verification and how protected routes use tokens."
        },
        {
            question: "What is the JavaScript Event Loop?",
            intention: "To assess asynchronous JavaScript knowledge.",
            answer: "Explain the call stack, task queue, microtask queue and event loop."
        },
        {
            question: "How do you handle errors in Node.js?",
            intention: "To evaluate debugging and error-handling skills.",
            answer: "Explain try-catch, error middleware, proper HTTP status codes and logging."
        }
    ],

    behaviouralquestion: [
        {
            question: "Tell me about a challenging project you worked on.",
            intention: "To evaluate problem-solving skills.",
            answer: "Use the STAR method: Situation, Task, Action and Result."
        },
        {
            question: "How do you handle tight deadlines?",
            intention: "To evaluate time management.",
            answer: "Explain prioritization, task breakdown and communication."
        },
        {
            question: "Tell me about a technical problem you solved.",
            intention: "To assess technical ownership.",
            answer: "Describe the issue, debugging process, solution and outcome."
        },
        {
            question: "How do you learn a new technology?",
            intention: "To evaluate learning ability.",
            answer: "Explain documentation, hands-on practice and building small projects."
        },
        {
            question: "How do you handle disagreements with teammates?",
            intention: "To assess teamwork.",
            answer: "Explain listening, discussing alternatives and reaching a solution."
        }
    ],

    skillGaps: [
        {
            skill: "System Design",
            severity: "low"
        }
    ],

    preparationPlan: [
        {
            day: 1,
            focus: "JavaScript Fundamentals",
            tasks: ["Revise closures", "Practice promises"]
        },
        {
            day: 2,
            focus: "React",
            tasks: ["Revise hooks", "Practice component state"]
        },
        {
            day: 3,
            focus: "Node.js and Express",
            tasks: ["Revise middleware", "Practice REST APIs"]
        },
        {
            day: 4,
            focus: "Database",
            tasks: ["Revise SQL", "Practice MongoDB queries"]
        },
        {
            day: 5,
            focus: "Authentication",
            tasks: ["Understand JWT", "Revise protected routes"]
        },
        {
            day: 6,
            focus: "DSA",
            tasks: ["Practice arrays", "Practice strings"]
        },
        {
            day: 7,
            focus: "Mock Interview",
            tasks: ["Revise projects", "Practice behavioral questions"]
        }
    ]
};

module.exports = demoReport;