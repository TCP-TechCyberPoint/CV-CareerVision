# Career Vision (CV) 🚀

## 🌟 Vision & Mission

Career Vision is a digital platform designed to empower job seekers in the Israeli tech industry, particularly juniors and career switchers. Our mission is to provide smart, accessible tools that help users build their professional identity, create compelling CVs, and navigate their career journey with confidence.

### Core Values
- **Accessibility**: High-quality tools available to everyone
- **Innovation**: Smart AI-powered solutions
- **Community**: Supportive environment for growth
- **Empowerment**: Building confidence through technology

## 🎯 Core Features

### 1. Career Identity Builder
- Smart 8-page questionnaire with real-time analysis
- Dual language support (Hebrew/English)
- Real-time draft saving via WebSocket
- AI-powered role matching and skill analysis
- Progress tracking and motivational feedback

### 2. Professional CV Builder
- ATS-friendly templates
- Smart content suggestions
- Dual language support
- Real-time preview
- Export to multiple formats

### 3. RealTalk AI Coach
- HR interview simulations
- Personalized feedback
- Voice input support
- Question adaptation based on profile
- Performance analytics

### 4. Progress Tracker
- Interactive dashboard
- Goal setting and tracking
- Achievement system
- Real-time updates
- Personalized recommendations

### 5. LinkedIn Job Fetcher
- Smart job matching
- Automated applications
- Status tracking
- Custom filters
- Match percentage analysis

### 6. CV Connect
- Smart CV distribution
- Application tracking
- Status updates
- Analytics dashboard
- Success rate tracking

### 7. TCP Community & Mentoring
- Professional networking
- Mentorship opportunities
- Community events
- Resource sharing
- Career guidance

## 💰 Subscription Plans

### Free Tier
- Basic Career Identity Builder
- One CV template
- Limited interview simulations
- Basic progress tracking
- Community access

### Regular Tier (₪50/month)
- Enhanced identity analysis
- Multiple CV templates
- Extended interview features
- Advanced progress tracking
- Job matching features

### Premium Tier (₪100/month)
- Advanced AI analysis
- All CV templates
- Full interview suite
- Comprehensive tracking
- Priority support

## 🔧 Technical Stack

### Frontend
- **Framework**: React.js with TypeScript
- **State Management**: Redux Toolkit / React Context
- **Styling**: Tailwind CSS
- **Internationalization**: react-i18next
- **Accessibility**: React Aria / axe DevTools
- **Animations**: Framer Motion
- **Forms**: Formik + Yup / React Hook Form
- **API Client**: Axios
- **Routing**: React Router
- **Notifications**: React Toastify

### Backend
- **API Framework**: FastAPI
- **Database**: PostgreSQL
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Real-time**: WebSockets
- **Caching**: Redis
- **Containerization**: Docker Compose
- **Deployment**: Railway.app

### AI/ML
- **NLP**: SpaCy & TextBlob (Free)
- **Advanced Analysis**: LLaMA 2 (Premium)
- **Transformers**: HuggingFace
- **Embeddings**: Sentence Transformers
- **OCR**: Tesseract
- **Cloud Services**: Various APIs

## 🛡️ Security & Privacy

### Data Protection
- HTTPS encryption
- AES-256 for sensitive data
- JWT authentication
- Rate limiting
- Input validation

### Privacy Features
- GDPR compliance
- Data encryption
- User consent management
- Data deletion rights
- Privacy controls

### Security Measures
- Regular security audits
- Automated scanning
- Access control
- Session management
- Secure APIs

## 🎨 User Experience

### Design Principles
- Intuitive navigation
- Responsive design
- Accessibility (WCAG 2.1)
- RTL/LTR support
- Performance optimization

### Features
- Real-time feedback
- Progress indicators
- Motivational messages
- Achievement system
- Interactive elements

## 👥 Development Team

### Leadership
- Yosi Leviev - Founder & Vision
- Ben Harari - Team Leader Developer

### Development
- Yosi Kariv - Junior Front-End
- Guy First - Junior Back-End
- Lior Shavit - Junior Front-End
- Itay - 
- Laith Khater - 

### Quality & Operations
- Eilon Manela - Junior QA
- Bar Berkovich - Junior DevOps
- Yagel -  Security

## 📚 Documentation

For detailed documentation, please refer to:
- [Technical Architecture](docs/technical-architecture.md)
- [AI/ML Features](docs/ai-ml-features.md)
- [User Experience](docs/user-experience.md)
- [Security & Privacy](docs/security-privacy.md)

## 🔗 Links

- [TCP Community](https://www.techcyberpoint.co.il)
- [TCP About-Page](https://www.techcyberpoint.co.il/%d7%90%d7%95%d7%93%d7%95%d7%aa/)
- [GitHub Repository](https://github.com/TCP-TechCyberPoint/CV-CareerVision)

## 📊 Project Status

### Current Phase
- 🟡 Planning & Architecture
- 🟡 Documentation
- 🔴 Development
- 🔴 Testing
- 🔴 Deployment

### Current Working Branches
- **main** - Production branch (protected)
- **develop** - Development branch (protected)
- **feature/career-identity** - Career Identity Builder implementation
- **feature/cv-builder** - CV Builder implementation
- **feature/progress-tracker** - Progress Tracker implementation
- **docs/architecture** - Technical documentation updates

### Branch Strategy
1. **Feature Branches**
   - Created from `develop`
   - Naming: `feature/feature-name`
   - Merged back to `develop` via PR

2. **Documentation Branches**
   - Created from `develop`
   - Naming: `docs/topic-name`
   - Merged back to `develop` via PR

3. **Hotfix Branches**
   - Created from `main`
   - Naming: `hotfix/issue-description`
   - Merged to both `main` and `develop`

### Development Workflow
1. Create feature branch from `develop`
2. Implement changes
3. Write tests
4. Update documentation
5. Create PR to `develop`
6. Code review
7. Merge to `develop`
8. Deploy to staging
9. QA testing
10. Merge to `main` for production

## 🤝 Contributing

### Development Setup
1. **Prerequisites**
   - Node.js (v18+)
   - Python (v3.9+)
   - Docker & Docker Compose
   - PostgreSQL
   - Redis

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/TCP-TechCyberPoint/CV-CareerVision.git
   cd CV-CareerVision

   # Install dependencies
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

3. **Environment Setup**
   ```bash
   # Create .env files
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Running the Project**
   ```bash
   # Using Docker Compose
   docker-compose up

   # Or run services separately
   # Frontend
   cd client
   npm run dev

   # Backend
   cd server
   uvicorn main:app --reload
   ```

### Contribution Guidelines
1. **Code Style**
   - Follow TypeScript/React best practices
   - Use ESLint and Prettier
   - Write meaningful commit messages

2. **Pull Request Process**
   - Create feature branch
   - Write tests
   - Update documentation
   - Submit PR with description

3. **Testing**
   - Write unit tests
   - Run integration tests
   - Ensure CI passes

## 🐛 Known Issues

### Current Limitations
- Limited Hebrew NLP support
- Basic CV templates only
- No mobile app yet

### Planned Fixes
- Enhanced Hebrew language processing
- More CV templates
- Mobile responsiveness improvements

## 📈 Performance Metrics

### Target Metrics
- Page Load: < 2s
- API Response: < 200ms
- Real-time Updates: < 100ms
- AI Processing: < 3s

### Monitoring
- Frontend: Google Analytics
- Backend: Prometheus
- AI: Custom metrics

## 🔄 CI/CD Pipeline

### Development
- Automated testing
- Code quality checks
- Security scanning

### Staging
- Integration testing
- Performance testing
- User acceptance testing

### Production
- Blue-green deployment
- Automated rollback
- Health monitoring

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TCP Community for support
- Open source contributors
- Beta testers

---

> **Empowering juniors to achieve their career dreams – one step at a time.**
