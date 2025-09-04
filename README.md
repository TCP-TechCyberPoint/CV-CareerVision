# 🚀 Career Vision (CV)

## 🌟 Vision & Mission

Career Vision is a digital platform designed to empower job seekers in the Israeli tech industry, particularly juniors and career switchers. Our mission is to provide smart, accessible tools that help users build their professional identity, create compelling CVs, and navigate their career journey with confidence.

### 🔑 Core Values

- **Accessibility**: High-quality tools available to everyone  
- **Innovation**: Smart AI-powered solutions  
- **Community**: Supportive environment for growth  

## 🎯 Core Features

### 📄 Professional CV Builder

- ✅ Smart 8-page questionnaire with real-time analysis  
- ❓ Dual language support (Hebrew/English) *(Currently Not Implemented)*  
- ✅ Real-time draft saving  
- ✅ Dashboard for reviewing all collected data in a single page  
- ✅ Questionnaire progress bar to reflect completion  
- ✅ AI-powered CV generation  
- ❓ Progress tracking and motivational feedback *(Currently Not Implemented)*  
- ✅ Downloadable `.docx` format for user customization  

### 🧠 RealTalk AI Coach

- HR interview simulations  
- Personalized feedback  
- Voice input support  
- Question adaptation based on profile  
- Performance analytics  

### 📈 Progress Tracker *(Currently Not Implemented)*

- Interactive dashboard  
- Goal setting and tracking  
- Achievement system  
- Real-time updates  
- Personalized recommendations  

### 💼 LinkedIn Job Fetcher *(Currently Not Implemented)*

- Smart job matching  
- Automated applications *(Currently Not Implemented)*  
- Status tracking  
- Custom filters  
- Match percentage analysis  

### 🔗 CV Connect *(Currently Not Implemented)*

- Smart CV distribution  
- Application tracking  
- Status updates  
- Analytics dashboard  
- Success rate tracking  

### 👥 TCP Community & Mentoring *(Currently Not Implemented)*

- Professional networking  
- Mentorship opportunities  
- Community events  
- Resource sharing  
- Career guidance  

## 🛠️ Development Setup

### ⚙️ 1. Prerequisites

#### 📦 Required Software

- **Node.js** (v18+)  
- **Git**  
- **Docker** (for local Keycloak)

### 💾 2. Local Installation

#### 📁 Step 1: Create Project Folder

Create a folder on your machine named **`Career Vision`**.

#### 💻 Step 2: Open Git Bash & Clone Repository

Navigate to the newly created directory and run:

```bash
# Clone the repository
git clone https://github.com/TCP-TechCyberPoint/CV-CareerVision.git
cd CV-CareerVision

# Install dependencies for the Client (Frontend)
cd client
npm install

# Install dependencies for the Server (Backend)
cd ../server
npm install
```

### 🔐 3. Keycloak Authentication Setup

#### 🐳 Step 1: Start Keycloak Locally

```bash
# Start Keycloak in development mode
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
```

#### ⚙️ Step 2: Configure Keycloak Realm

1. **Access Keycloak Admin Console**: http://localhost:8080
2. **Login**: admin / admin
3. **Create Realm**: `cv-app`
4. **Create Frontend Client**:
   - Client ID: `cv-frontend`
   - Client Protocol: `openid-connect`
   - Access Type: `public`
   - Valid Redirect URIs: `http://localhost:5173/*`
   - Web Origins: `http://localhost:5173`
   - Standard Flow: `ON`
   - PKCE: `S256`
   - Client Authentication: `OFF`

5. **Create API Client**:
   - Client ID: `cv-api`
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`
   - Client Authentication: `ON`

6. **Configure Audience Mapper**:
   - On `cv-frontend` client, add audience mapper
   - Audience: `cv-api`

### 🧪 4. Environment Setup

#### 📁 Server Environment (`.env`)

Create a `.env` file in the `server/` directory:

```env
# Keycloak Configuration
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=cv-app
KEYCLOAK_API_AUDIENCE=cv-api
ALLOWED_ORIGINS=http://localhost:5173

# MongoDB
MONGO_URI=mongodb://localhost:27017/cv-careervision

# Cloudinary (keep existing)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Other existing environment variables...
```

#### 📁 Client Environment (`.env`)

Create a `.env` file in the `client/` directory:

```env
# Keycloak Configuration
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=cv-app
VITE_KEYCLOAK_CLIENT_ID=cv-frontend
VITE_API_URL=http://localhost:5000

# Other existing environment variables...
```

### ▶️ 5. Running the Project

Open **three terminals** in the root directory:

```bash
# Terminal 1 – Start Keycloak (if not using Docker)
# Keycloak should be running on http://localhost:8080

# Terminal 2 – Start the client
cd client
npm run dev

# ✅ Should display:
# VITE v6.3.5  ready in #### ms
# ➡️  Local:   http://localhost:####
# ➡️  Network: use --host to expose

# Terminal 3 – Start the backend server
cd server
npm run dev

# ✅ Should display:
# 🚀 Server running on port ####
```

#### 🌐 Access URLs

- **Frontend App**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Keycloak Admin**: http://localhost:8080
- **API Documentation**: http://localhost:5000/api-docs

## 💰 Subscription Plans

### 🆓 Free Tier

- Limited CV generations  
- Single CV template for cloud saving  
- Limited interview simulations  
- Basic progress tracking  
- Community access  

### 💳 Regular Tier (₪50/month)

- Enhanced identity analysis  
- Unlimited CV templates  
- Extended interview features  
- Advanced progress tracking  
- Job matching features  

### 💎 Premium Tier (₪100/month)

- Advanced AI analysis  
- All CV templates  
- Full interview suite  
- Comprehensive tracking  
- Priority support  

## 🔧 Technical Stack

## 🧩 Technical Stack

- **Framework**: React.js + TypeScript  
- **State Management**: Zustand  
- **Styling**: Chakra UI 3.21  
- **Internationalization**: react-i18next *(Not Implemented)*  
- **Accessibility**: React Aria  
- **Animations**: Framer Motion  
- **Forms**: React Hook Form + ZOD  
- **API Client**: Axios  
- **Routing**: React Router  
- **Notifications**: React Toastify  

### 🔧 Backend

- **API Framework**: Express.js  
- **Database**: MongoDB  
- **Authentication**: Keycloak  
- **Storage**: Cloudinary  
- **Real-time**: ___  
- **Caching**: ___  
- **Containerization**: Docker Compose  
- **Deployment**: ___  

### 🧠 AI / ML

- **NLP**: ___  
- **Advanced Analysis**: ___  
- **Transformers**: ___  
- **Embeddings**: ___  
- **OCR**: ___  
- **Cloud Services**: ___  

### 🔒 Data Protection

- Keycloak OAuth2/OIDC authentication  
- JWT tokens with PKCE  
- No password storage  

> ‼️ _Needed to be filled..._

### 🕵️ Privacy Features

> ‼️ _Needed to be filled..._

### 🛡️ Security Measures

> ‼️ _Needed to be filled..._

## 🎨 User Experience

> ‼️ _Needed to be filled..._

### 📐 Design Principles

> ‼️ _Needed to be filled..._

## 👥 Development Team

### 🧭 Leadership

- **Yosi Leviev** – Founder & Vision  
- **Ben Harari** – Team Leader Developer  

### 🎨 UX/UI

- **Omer _lastname_**

### 💻 Development

- **Lior Silman** – Junior Front-End  
- **Itay Cohen** – Junior Front-End  
- **Laith Khater** – Junior Back-End  

### ✅ Quality & Operations

- **Eilon Manela** – Junior QA  
- **Bar Berkovich** – Junior DevOps  
- **Yagel** – Information Security  


## 📚 Documentation

- [📘 Technical Architecture](docs/technical-architecture.md)  
- [🤖 AI/ML Features](docs/ai-ml-features.md)  
- [🎨 User Experience](docs/user-experience.md)  
- [🔐 Security & Privacy](docs/security-privacy.md)  

## 🔗 Links

- 🌐 [TCP Community](https://www.techcyberpoint.co.il)  
- 🧾 [TCP About Page](https://www.techcyberpoint.co.il/%d7%90%d7%95%d7%93%d7%95%d7%aa/)  
- 💻 [GitHub Repository](https://github.com/TCP-TechCyberPoint/CV-CareerVision)  

## 📊 Project Status

### 🧭 Current Phase

- 🟡 Planning & Architecture  
- 🟡 Documentation  
- 🟡 Development  
- 🔴 Testing  
- 🔴 Deployment  

### 🌿 Current Working Branches

- **main** – Production branch *(protected)*  
- **dev-clean** – Development branch *(protected)*  

### 🌱 Branch Strategy

> ‼️ _Needed to be filled..._

### ⚙️ Development Workflow

> ‼️ _Needed to be filled..._

## 🤝 Contribution Guidelines

#### 1. Branch Naming Convention

All branches should follow the format:

```
type/developer-name/short-description
```

**Where:**

- `type` — describes the purpose of the branch. Use one of the following:
  - `feature` — for new features
  - `bug` — for bug fixes
  - `fix` — for minor fixes or tweaks
  - `refactor` — for code restructuring without feature changes
  - `docs` — for documentation updates
  - `test` — for testing-related work
- `developer-name` — your name or GitHub handle
- `short-description` — concise, kebab-case summary of the change

✅ **Examples:**

```
feature/lior/create-ui-chatbot
bug/itay/fix-login-redirect
docs/omer/update-readme
refactor/laith/optimize-user-service
test/eilon/add-cv-tests
```

> 🔐 **Note:** Avoid using uppercase letters or spaces. Use hyphens (`-`) instead of underscores

#### 2. Pull Request Process  
> ‼️ _Needed to be filled..._

#### 3. Testing  
> ‼️ _Needed to be filled..._

## 🐞 Known Issues

### 🚧 Current Limitations  
> ‼️ _Needed to be filled..._

### 🛠️ Planned Fixes  
> ‼️ _Needed to be filled..._

## 📈 Performance Metrics

### 🎯 Target Metrics

- **Page Load**: < 2s  
- **API Response**: < 200ms  
- **Real-time Updates**: < 100ms  
- **AI Processing**: < 3s  

### 📡 Monitoring  
> ‼️ _Needed to be filled..._

## 🔁 CI/CD Pipeline

### 🧪 Development  
> ‼️ _Needed to be filled..._

### 🚧 Staging  
> ‼️ _Needed to be filled..._

### 🚀 Production  
> ‼️ _Needed to be filled..._

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.