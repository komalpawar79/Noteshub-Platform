# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Port 5173)                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │  Pages     │  │ Components │  │  Services  │         │  │
│  │  │ Dashboard  │  │   Button   │  │    API     │         │  │
│  │  │  Upload    │  │    Card    │  │   Axios    │         │  │
│  │  │  Profile   │  │   Navbar   │  │  Socket.io │         │  │
│  │  │   Admin    │  │  NoteCard  │  └────────────┘         │  │
│  │  └────────────┘  └────────────┘                          │  │
│  │                                                            │  │
│  │  Styling: TailwindCSS + Framer Motion                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS + WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Node.js + Express (Port 5000)                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │   Routes   │  │Controllers │  │ Middleware │         │  │
│  │  │   Auth     │  │    Auth    │  │    JWT     │         │  │
│  │  │   Notes    │  │   Notes    │  │   Upload   │         │  │
│  │  │  Comments  │  │  Comments  │  │   CORS     │         │  │
│  │  │   Admin    │  │   Admin    │  └────────────┘         │  │
│  │  └────────────┘  └────────────┘                          │  │
│  │                                                            │  │
│  │  Real-time: Socket.io Server                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                    │                        │
                    │                        │
                    ▼                        ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│     DATABASE LAYER       │    │    FILE STORAGE LAYER    │
│  ┌────────────────────┐  │    │  ┌────────────────────┐  │
│  │   MongoDB          │  │    │  │   Cloudinary       │  │
│  │                    │  │    │  │                    │  │
│  │  Collections:      │  │    │  │  Storage:          │  │
│  │  • users           │  │    │  │  • PDFs            │  │
│  │  • notes           │  │    │  │  • DOCX files      │  │
│  │  • comments        │  │    │  │  • Images          │  │
│  │                    │  │    │  │                    │  │
│  │  Indexes:          │  │    │  │  Features:         │  │
│  │  • Text search     │  │    │  │  • CDN delivery    │  │
│  │  • User queries    │  │    │  │  • Transformations │  │
│  │  • Analytics       │  │    │  │  • URL generation  │  │
│  └────────────────────┘  │    │  └────────────────────┘  │
└──────────────────────────┘    └──────────────────────────┘
```

## Data Flow Diagrams

### 1. User Authentication Flow

```
User → Register/Login → Backend validates
                           ↓
                    Generate JWT token
                           ↓
                    Return token + user data
                           ↓
                    Frontend stores in localStorage
                           ↓
                    Token attached to all requests
                           ↓
                    Backend verifies token
                           ↓
                    Access granted/denied
```

### 2. Note Upload Flow

```
User selects file → Frontend validates
                           ↓
                    Create FormData
                           ↓
                    POST to /api/notes
                           ↓
                    Multer processes file
                           ↓
                    Upload to Cloudinary
                           ↓
                    Get file URL
                           ↓
                    Save to MongoDB (status: pending)
                           ↓
                    Return note data
                           ↓
                    Admin approves
                           ↓
                    Status: approved
                           ↓
                    Visible to all users
```

### 3. Search Flow

```
User enters query → Frontend sends request
                           ↓
                    Backend receives filters
                           ↓
                    MongoDB text search
                           ↓
                    Apply filters (subject, course, etc.)
                           ↓
                    Sort results
                           ↓
                    Return notes array
                           ↓
                    Frontend displays with animations
```

## Component Architecture

### Frontend Components Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   └── User Menu
│
├── Routes
│   ├── Dashboard
│   │   ├── SearchBar
│   │   ├── FilterBar
│   │   └── NoteCard (multiple)
│   │
│   ├── Upload
│   │   ├── Form
│   │   └── FileUpload
│   │
│   ├── NoteDetail
│   │   ├── NoteInfo
│   │   ├── PDFViewer
│   │   ├── ActionButtons
│   │   └── Comments
│   │       ├── CommentForm
│   │       └── CommentList
│   │
│   ├── Profile
│   │   ├── UserInfo
│   │   ├── EditForm
│   │   └── Statistics
│   │
│   ├── Admin
│   │   ├── StatsCards
│   │   ├── PendingNotes
│   │   └── UserManagement
│   │
│   ├── Login
│   │   └── LoginForm
│   │
│   └── Register
│       └── RegisterForm
│
└── Shared Components
    ├── Button
    ├── Input
    ├── Card
    └── Loading
```

### Backend API Structure

```
server.js
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── URL Encoded
│
├── Routes
│   ├── /api/auth
│   │   ├── POST /register
│   │   ├── POST /login
│   │   ├── GET /profile
│   │   └── PUT /profile
│   │
│   ├── /api/notes
│   │   ├── POST / (upload)
│   │   ├── GET / (list)
│   │   ├── GET /:id
│   │   ├── POST /:id/like
│   │   ├── POST /:id/download
│   │   ├── PUT /:id/status
│   │   └── DELETE /:id
│   │
│   ├── /api/comments
│   │   ├── POST /:noteId
│   │   ├── GET /:noteId
│   │   └── DELETE /:id
│   │
│   └── /api/admin
│       ├── GET /users
│       ├── PUT /users/:id/role
│       ├── DELETE /users/:id
│       └── GET /stats
│
└── Socket.io
    ├── join-course
    ├── send-message
    └── receive-message
```

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/faculty/admin),
  avatar: String,
  bio: String,
  department: String,
  semester: Number,
  interests: [String],
  subscribedSubjects: [String],
  stats: {
    uploads: Number,
    downloads: Number,
    contributions: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Notes Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  course: String,
  semester: Number,
  tags: [String],
  fileUrl: String,
  fileType: String (pdf/docx/image),
  cloudinaryId: String,
  uploadedBy: ObjectId (ref: User),
  status: String (pending/approved/rejected),
  analytics: {
    views: Number,
    downloads: Number,
    likes: Number
  },
  likedBy: [ObjectId],
  rating: Number,
  ratingCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Comments Collection

```javascript
{
  _id: ObjectId,
  noteId: ObjectId (ref: Note),
  userId: ObjectId (ref: User),
  text: String,
  likes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                  │
├─────────────────────────────────────────┤
│  1. Input Validation                    │
│     • Express Validator                 │
│     • File type checking                │
│     • Size limits                       │
├─────────────────────────────────────────┤
│  2. Authentication                      │
│     • JWT tokens                        │
│     • Bcrypt password hashing           │
│     • Token expiration                  │
├─────────────────────────────────────────┤
│  3. Authorization                       │
│     • Role-based access control         │
│     • Protected routes                  │
│     • Ownership verification            │
├─────────────────────────────────────────┤
│  4. Data Protection                     │
│     • HTTPS (production)                │
│     • CORS configuration                │
│     • Environment variables             │
├─────────────────────────────────────────┤
│  5. File Security                       │
│     • Cloudinary secure URLs            │
│     • File type validation              │
│     • Size restrictions                 │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Production Setup                    │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Frontend (Vercel/Netlify)                          │
│  • Static files served via CDN                       │
│  • Environment variables configured                  │
│  • HTTPS enabled                                     │
│                                                       │
│  Backend (Heroku/Railway/Render)                    │
│  • Node.js server running                           │
│  • Environment variables set                         │
│  • HTTPS enabled                                     │
│  • Auto-scaling enabled                             │
│                                                       │
│  Database (MongoDB Atlas)                           │
│  • Cloud-hosted MongoDB                             │
│  • Automatic backups                                │
│  • Replica sets for high availability               │
│                                                       │
│  File Storage (Cloudinary)                          │
│  • CDN delivery                                     │
│  • Automatic optimization                           │
│  • Secure URLs                                      │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## Technology Stack Summary

```
┌─────────────────────────────────────────┐
│  Frontend                                │
│  • React 18                             │
│  • Vite                                 │
│  • TailwindCSS                          │
│  • Framer Motion                        │
│  • React Router DOM                     │
│  • Axios                                │
│  • Socket.io Client                     │
├─────────────────────────────────────────┤
│  Backend                                │
│  • Node.js                              │
│  • Express.js                           │
│  • MongoDB + Mongoose                   │
│  • JWT                                  │
│  • Bcrypt                               │
│  • Multer                               │
│  • Socket.io                            │
├─────────────────────────────────────────┤
│  External Services                      │
│  • Cloudinary (file storage)            │
│  • MongoDB Atlas (database)             │
├─────────────────────────────────────────┤
│  Development Tools                      │
│  • Nodemon                              │
│  • Postman                              │
│  • MongoDB Compass                      │
│  • VS Code                              │
└─────────────────────────────────────────┘
```

---

This architecture provides a scalable, secure, and maintainable foundation for the NotesHub platform.
