<img width="2366" height="1342" alt="strideregister" src="https://github.com/user-attachments/assets/12dec78b-0d55-4994-8895-f5a6d2384995" />

# Stride App

Stride App is a full-stack productivity and task-management web application.
It provides a streamlined interface for organizing tasks, tracking progress, and improving personal workflow.

## Features
- Create, edit, and delete tasks
- Planned user authentication (JWT/OAuth)
- REST API built with Express and MongoDB
- Responsive frontend built with Next.js and React

## Technology Stack
- **Frontend:** Next.js (React)
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **Deployment (optional):** Vercel (frontend) / Render (backend)

## Getting Started

### Prerequisites
- [Node.js 18 or higher](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/nathanwan-0/stride-app.git
cd stride-app
```

### Backend Setup
```bash
cd backend
cp ../.env.example .env    # configure MONGO_URI and PORT
npm install
npm run dev
```
Backend runs at `http://localhost:5000`.

### Frontend Setup
```bash
cd ../stride-app-main
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`.

## Roadmap
- User accounts and authentication
- Task categories, deadlines, and priorities
- Kanban board with drag-and-drop
- CI/CD deployment pipeline

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m "Add my feature"`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License
Released under the MIT License.
