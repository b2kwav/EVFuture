# GenAI Gamified EV Showroom - MVP

An interactive, gamified web application designed to help first-time EV buyers discover the perfect electric vehicle for their lifestyle.

## 🚀 Features

- **Interactive Journey**: Answer lifestyle questions through an engaging, progressive experience
- **AI Assistant Panel**: Get contextual EV education as you answer questions
- **Mobility Profile**: Automatic profile generation based on user answers
- **Smart Recommendations**: ML-based vehicle recommendations tailored to lifestyle
- **Vehicle Explorer**: Browse all 8 ElectriCore models with detailed specs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Game-like UI**: Visual progress indicators, animations, and engaging interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with React 18
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Data**: JSON-based vehicle and questionnaire data

## 📋 Project Structure

```
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Next.js pages and routes
│   ├── styles/         # Global CSS and Tailwind
│   └── types/          # TypeScript type definitions
├── public/
│   └── data/           # JSON data files
├── package.json        # Dependencies
└── README.md
```

## ⚡ Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/b2kwav/genai-gamified-ev-showroom.git
cd genai-gamified-ev-showroom

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📖 User Flow

1. **Landing Page** - Introduction to ElectriCore brand
2. **Journey** - 8-question questionnaire with AI assistant guidance
3. **Profile** - Automatic lifestyle profile generation
4. **Recommendations** - Top 3 tailored vehicle recommendations
5. **Explorer** - Browse all vehicles and compare specs
6. **Details** - View individual vehicle details and schedule test drive

## 🎮 Key Components

### Pages
- **Home** (`/`) - Landing page with features overview
- **Journey** (`/journey`) - Interactive questionnaire
- **Profile** (`/profile`) - Recommendations and vehicle exploration
- **Vehicle Detail** (`/vehicle/[id]`) - Individual vehicle showcase

### Components
- `Layout` - Main layout wrapper
- `Navbar` - Navigation bar
- `Footer` - Footer component
- `Progress` - Progress indicator
- `QuestionCard` - Question display and selection
- `VehicleCard` - Vehicle information card
- `AIAssistantPanel` - Contextual help panel

## 🚗 ElectriCore Vehicle Lineup

1. **CitySprint Pro** - Compact urban commuter
2. **FamilyFlow Max** - Family SUV
3. **RangeRunner Elite** - Long-range sedan
4. **PerformancePulse GT** - Sports electric
5. **EcoCommute Lite** - Budget-friendly compact
6. **AdventureX Trail** - Off-road SUV
7. **MiniBus Connect** - 8-seater van
8. **LuxeGlide Premium** - Premium sedan

## 🎨 Design System

- **Colors**
  - Primary: `#00a8e8` (Electric Blue)
  - Secondary: `#001f3f` (Navy)
  - Accent: `#ffd60a` (Gold)

- **Animations**
  - Fade-in on load
  - Slide-up for new content
  - Pulse-glow for CTAs

## 📊 Data Files

- `/public/data/vehicles.json` - Vehicle specifications and details
- `/public/data/questionnaire.json` - Questionnaire structure and recommendations

## 🔄 Recommendation Algorithm

The system scores vehicles based on:
- Commute distance vs. vehicle range
- Family size vs. seating capacity
- Budget constraints vs. price
- User preferences vs. vehicle performance

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t ev-showroom .
docker run -p 3000:3000 ev-showroom
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔮 Future Enhancements

- [ ] Real-time vehicle inventory integration
- [ ] Advanced filtering and comparison tools
- [ ] Virtual showroom with 3D models
- [ ] User accounts and saved preferences
- [ ] Integration with financing options
- [ ] Real charging network API integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**GenAI Team**
- GitHub: [@b2kwav](https://github.com/b2kwav)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For support, email support@electricore.com or open an issue on GitHub.

---

**Happy EV Shopping!** ⚡🚗