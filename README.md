# Innoscripta News Aggregator

A news aggregation application built with Next.js that combines articles from multiple sources.

## Local Development

### Prerequisites
- Node.js 20 or higher
- npm (Node Package Manager)

### Installation

1. Install dependencies
```bash
npm install
```

2. Run the development server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build and Production

To build the application:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Docker Deployment

### Build the Docker Image
```bash
docker build -t innoscripta-news .
```

### Run the Container
```bash
docker run -p 3000:3000 innoscripta-news
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Environment variables are required for the application to function properly. A template file `.template.env` is provided with sample configurations.

1. Copy the template file:
```bash
cp .template.env .env
```

2. Update the `.env` file with your actual values:
```env
# API Keys for news sources
API_KEY_NEWS_API=your_newsapi_key
API_KEY_GUARDIAN=your_guardian_key
API_KEY_NYTIME=your_nyt_key
```


