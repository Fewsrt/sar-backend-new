# SAR Backend API

Backend API service for Car Sales ERP System, built with Express.js, PostgreSQL, and Firebase.

## 🌟 Features

### Core Features
- 🔐 Authentication & Authorization
  - JWT-based authentication
  - Role-based access control
  - LINE login integration
  - Password reset functionality

### Business Management
- 👥 Employee Management
  - Role management
  - Employee profiles
  - Performance tracking
- 📊 Branch Management
  - Multi-branch support
  - Branch-specific reporting
- 🚗 Car Inventory Management
  - Stock tracking
  - Car details and specifications
  - Maintenance history
- 🤝 Customer Management
  - Customer profiles
  - Purchase history
  - Reservation system
- 📦 Supplier Management
  - Supplier profiles
  - Purchase orders
  - Invoice tracking

### Financial Management
- 💰 Sales Management
  - Sales tracking
  - Commission calculation
  - Sales reporting
- 📑 Tax Invoice System
  - Purchase tax invoices
  - Withholding tax management
  - Automated tax calculations
- 🏦 Banking Integration
  - Bank employee management
  - Transfer tracking
  - Payment verification

### System Features
- 🔄 Automated Backup System
  - Daily automated backups
  - Firebase Storage integration
  - Backup history tracking
  - Restore functionality
- 📝 Comprehensive Logging
  - Activity logging
  - Error tracking
  - Audit trails
- 🛡️ Security Features
  - Rate limiting
  - XSS protection
  - CORS configuration
  - Input validation

## 🛠️ Technical Stack

- **Backend Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Cloud Storage**: Firebase
- **Caching**: Redis
- **Logging**: Winston
- **Documentation**: Swagger/OpenAPI

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL
- Redis
- npm or yarn
- Firebase account (for backup system)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/fewsrt/sar-backend-api.git
cd sar-backend-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="90d"

# Firebase (for backup)
FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"

# Redis
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD="your-redis-password"

# Security
ALLOWED_ORIGINS="http://localhost:3000,https://your-production-domain.com"
```

5. Set up the database:
```bash
npm run migrate
npm run seed
```

## 🚀 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Testing
```bash
npm test
```

### Database Management
```bash
# Create migration
npm run migrate:create

# Apply migrations
npm run migrate

# Reset database
npm run migrate:reset
```

### Backup Management
```bash
# Manual backup
npm run backup:create

# Restore from backup
npm run backup:restore
```

## 📚 API Documentation

Detailed API documentation is available at `/api-docs` when running the server.

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot-reload
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run migrate` - Run database migrations
- `npm run backup` - Create manual backup
- `npm run seed` - Seed database with initial data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Chonnaphat Visetchok - Initial work - [YourGithub](https://github.com/fewsrt)

## 🙏 Acknowledgments

- Express.js team
- Prisma team
- Firebase team
- All contributors

## 📞 Support

For support, email Chonnaphat.v@gmail.com or join our Slack channel.
