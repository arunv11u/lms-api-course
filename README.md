# Course Service

## Overview  
The Course Service is a core microservice of the Learning Management System (LMS), responsible for managing courses, lectures, and tracking student progress. It facilitates course creation, updates, and completion tracking while ensuring efficient data handling and scalability.

## Features  
- Course creation, updating, and deletion by instructors.  
- Management of lectures, including video and content tracking.  
- Tracks student course progress and completion percentages.  
- Handles course reviews and Q&A functionality.  
- Flexible and efficient data storage using **MongoDB**.

## Tech Stack  
- **Node.js**: Backend runtime for building scalable services.  
- **Express.js**: Framework for building RESTful APIs.  
- **MongoDB**: NoSQL database for flexible course and lecture data management.  
- **Apache Kafka**: For handling real-time updates and event-driven communication.  
- **AWS S3**: For storing lecture videos and related content.  
- **Docker & Kubernetes**: For containerizing and orchestrating microservices.