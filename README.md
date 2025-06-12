# Deployly - AI Website Generator & Deployment Platform

Deployly is an AI-powered platform that generates and deploys complete e-commerce websites based on business descriptions. Using GPT-4, it creates fully functional websites with payment integration and admin dashboards.

## Features

- 🤖 **AI-Powered Generation**: Uses GPT-4 to create custom websites
- 🚀 **Instant Deployment**: Deploy to Vercel with one click
- 💳 **Payment Integration**: Built-in Pinelabs payment gateway
- 📊 **Admin Dashboard**: Complete admin interface for managing products and orders
- 🎨 **Modern Design**: Responsive, professional-looking websites
- 🔒 **Secure**: Built-in authentication and security features

## Project Structure

```
deployly/
├── api/                    # Main API entry point (for Vercel deployment)
│   ├── main.py            # FastAPI app for Vercel
│   └── routes.py          # API routes
├── backend/               # Backend services
│   ├── main.py           # Backend FastAPI app
│   ├── routes.py         # Backend routes
│   ├── models/           # Pydantic models
│   └── services/         # Business logic services
├── frontend/             # Frontend web interface
│   ├── index.html        # Main frontend page
│   └── script.js         # Frontend JavaScript
├── requirements.txt      # Python dependencies
└── vercel.json          # Vercel deployment configuration
```

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here

# Vercel Configuration (Optional)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_TEAM_ID=your_vercel_team_id_here
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Development Server

```bash
# Run the main API server
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

# Or run the backend service
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8001
```

### 4. Access the Application

- Frontend: Open `frontend/index.html` in your browser
- API Documentation: http://localhost:8000/docs
- Backend API: http://localhost:8001/docs (if running separately)

## API Endpoints

### Main API (`/api`)
- `POST /generate-files` - Generate website files using GPT-4
- `GET /health` - Health check

### Backend API (`/api`)
- `POST /generate-files` - Generate website files
- `POST /deploy` - Deploy website to Vercel
- `GET /websites` - List deployed websites
- `POST /stores` - Create a new store
- `POST /products` - Create a new product

## Usage

1. **Describe Your Business**: Enter a detailed description of your business, products, and requirements
2. **Generate Website**: Click "Generate Website" to create your custom site using AI
3. **Preview**: Review the generated files and preview your website
4. **Deploy**: Deploy your website to Vercel with one click
5. **Manage**: Use the generated admin dashboard to manage your products and orders

## Generated Website Features

Each generated website includes:

- **Frontend**: Modern, responsive HTML/CSS/JavaScript
- **Backend**: FastAPI server with database integration
- **Database**: Supabase integration with proper schema
- **Payments**: Pinelabs payment gateway integration
- **Admin Dashboard**: Complete admin interface
- **Authentication**: User authentication system
- **Security**: Row-level security and proper validation

## Deployment

### Vercel Deployment

The project is configured for easy Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.