# NotesHub - University Notes Sharing Platform

A full-stack MERN application for university students and faculty to upload, share, search, preview, and comment on notes.

## Features

### Frontend
- ✅ Modern UI with ShadCN components and Framer Motion animations
- ✅ Orange (#FF6600) and White (#FFFFFF) color scheme
- ✅ Responsive design for desktop and mobile
- ✅ Dashboard with latest and popular notes
- ✅ Advanced search and filter functionality
- ✅ Upload notes (PDF, DOCX, images)
- ✅ Note preview with embedded PDF viewer
- ✅ Comments and ratings system
- ✅ User profile with statistics
- ✅ Admin panel for content moderation
- ✅ Smooth animations and transitions

### Backend
- ✅ RESTful API with Express.js
- ✅ JWT-based authentication
- ✅ Role-based access control (student, faculty, admin)
- ✅ MongoDB with Mongoose ODM
- ✅ Cloudinary integration for file storage
- ✅ Text search with MongoDB indexes
- ✅ Analytics tracking (views, downloads, likes)
- ✅ Real-time chat with Socket.io
- ✅ CRUD operations for notes and comments

## Tech Stack

**Frontend:**
- React.js 18
- Vite
- TailwindCSS
- ShadCN UI components
- Framer Motion
- React Router DOM
- Axios
- Socket.io Client

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Cloudinary
- Socket.io
- Multer

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes_platform
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
notes_app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── cloudinary.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Note.js
│   │   │   └── Comment.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── noteController.js
│   │   │   ├── commentController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── noteRoutes.js
│   │   │   ├── commentRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   ├── Navbar.jsx
    │   │   └── NoteCard.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Upload.jsx
    │   │   ├── NoteDetail.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Admin.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── lib/
    │   │   └── utils.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Notes
- `POST /api/notes` - Upload note (with file)
- `GET /api/notes` - Get all notes (with filters)
- `GET /api/notes/:id` - Get note by ID
- `POST /api/notes/:id/like` - Like/unlike note
- `POST /api/notes/:id/download` - Track download
- `PUT /api/notes/:id/status` - Update note status (admin)
- `DELETE /api/notes/:id` - Delete note (admin/faculty)

### Comments
- `POST /api/comments/:noteId` - Add comment
- `GET /api/comments/:noteId` - Get all comments
- `DELETE /api/comments/:id` - Delete comment

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get platform statistics

## User Roles

1. **Student**: Can upload, view, download, comment, and like notes
2. **Faculty**: Same as student + can delete their own notes
3. **Admin**: Full access + approve/reject notes, manage users, view analytics

## Features in Detail

### Search & Filter
- Full-text search across title, description, and tags
- Filter by subject, course, semester
- Sort by latest, most popular, or most downloaded

### File Upload
- Supports PDF, DOCX, and images (JPG, PNG)
- Files stored on Cloudinary
- 10MB file size limit
- Automatic file type detection

### Analytics
- Track views, downloads, and likes
- User contribution statistics
- Platform-wide analytics for admins

### Real-time Features
- Socket.io integration for course-based chat
- Real-time notifications (optional feature)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- File type validation
- Input sanitization
- Protected routes

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas)
3. Configure proper CORS settings
4. Use environment variables for all secrets
5. Deploy to services like Heroku, Railway, or AWS

### Frontend
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Update `VITE_API_URL` to production backend URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for learning or production.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using the MERN stack
