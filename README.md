# Employee Management System - Frontend

## Project Overview

This is the frontend application of the Employee Management System. The frontend is developed using React.js and deployed as a containerized application using Docker. The application is deployed into a Kubernetes cluster using Helm charts and automated through a Jenkins CI/CD pipeline.

The frontend communicates with the backend ASP.NET Core Web API to display and manage employee data.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend application development |
| Nginx | Serves the production React build |
| Docker | Containerizes the frontend application |
| Docker Hub | Stores frontend Docker images |
| Jenkins | Automates CI/CD pipeline |
| Helm | Provides reusable Kubernetes deployment templates |
| Kubernetes | Runs frontend containers as Pods |
| Argo CD | Optional GitOps-based automatic deployment |

---

## Project Workflow

The frontend deployment workflow is:

```text
Developer
   ↓
Push code to GitHub
   ↓
Jenkins pipeline starts
   ↓
Jenkins builds frontend Docker image
   ↓
Jenkins pushes image to Docker Hub
   ↓
Jenkins updates Helm image tag
   ↓
Helm chart is used for Kubernetes deployment
   ↓
Frontend Pods run in Kubernetes
   ↓
User accesses frontend through NodePort
