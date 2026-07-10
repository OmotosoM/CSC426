Software Requirement Specification (SRS) for IRO (Issues Reporting Outlet)


1.0 Introduction


1.1 Purpose


IRO (Issues Reporting Outlet) is a feasibility prototype built to give AAUA students and residents of the surrounding communities (Akungba, Iwaro, Etioro and Ayegunle) a direct, low-friction way to flag issues affecting town-and-gown relations, rather than relying on informal word-of-mouth channels.


Questionnaire link: https://docs.google.com/forms/d/e/1FAIpQLSfKs9gl9Te2-fosplqKVyJLZY6MJxXCGOdxTLASZLIwhUJKXw/viewform?usp=publish-editor


Short link: https://tinyurl.com/week3-dev


1.2 Scope


This prototype is a Single Page Application (SPA) that lets a reporter submit an issue and immediately see it reflected in a live feed. Because of the assignment's time constraints, it uses the browser's localStorage instead of a real backend database, which keeps the system self-contained while still demonstrating anonymous, community-level issue capture and display.


2.0 Overall Description


2.1 Operating Environment
IRO runs entirely client-side in the browser — no server or installation required. It has been designed to work across Chrome, Firefox, Safari and Edge, on both desktop and mobile devices.


2.2 User Classes and Characteristics


Reporters: students and community residents who need a quick, low-bandwidth way to log an issue, with the option to stay anonymous.
Observers/Liaisons: community leaders or campus staff who monitor the feed to stay aware of what's being reported and follow up where needed.


3.0 System Features & Functional Requirements (FR)


3.1 Issue Submission Module


FR-01 (Anonymous Reporting): The Name field is optional; if it is left blank, the system labels the submission as "Anonymous" rather than storing an empty value.


FR-02 (Location Mapping): A community must be selected before a report can be submitted, restricted to the four host communities covered by this study: Ayegunle, Akungba, Etioro, or Iwaro.


FR-03 (Categorization & Priority): Every report must include an issue category — Water Scarcity, Security/Harassment, Poor Electricity Supply, Hike in Rent, Poor Roads, or Other — and a priority level (Low, Medium, High). The category list mirrors the issue types identified in the questionnaire responses.


FR-04 (Data Capture): On submission, the system packages all input fields together with an auto-generated timestamp into a single record.


FR-09 (Respondent Type): The reporter may optionally indicate whether they are an AAUA Student or an Indigene, matching the first question on the questionnaire, to help distinguish the two audience groups in the data.


3.2 Report Rendering Module


FR-05 (Data Retrieval): The system reads previously saved reports back from local storage whenever the page loads.


FR-06 (Chronological Display): Reports are displayed newest-first, in reverse-chronological order, on the dashboard.
FR-07 (Empty State Handling): If no reports have been submitted yet, the dashboard shows the message: "No reports yet. Be the first to submit."
FR-08 (Visual Hierarchy): Each report is tagged with a colour-coded badge based on its priority (High = Red, Medium = Gold, Low = Green) so urgency is visible at a glance.
4.0 Non-Functional Requirements (NFR)
4.1 Performance Requirements
NFR-01 (Speed): Since there is no server round-trip, the system must process a submission and update the feed in under one second.
4.2 Security Requirements
NFR-02 (Cross-Site Scripting Protection): All user input is sanitized before being rendered to the page. An escapeHtml function intercepts &, <, >, ", and ' to prevent malicious script injection through the report fields.
4.3 Usability Requirements
NFR-03 (Responsive Design): The layout uses CSS Grid so it adapts across screen sizes; below 760px, it switches from a two-column to a single-column layout for mobile usability.
