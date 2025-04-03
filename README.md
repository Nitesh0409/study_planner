# Study Planner

A minimal yet powerful Study Planner application built using **React.js** and **Vite**. It helps users manage study subjects and tasks effectively, keeping their academic progress organized.

## Features

- Add and remove subjects
- Add tasks under specific subjects
- Mark tasks as completed
- Clear, responsive user interface
- Simple and lightweight structure

## Project Structure

study_planner/                                                  
├── public/        
│   └── favicon.svg                    # Optional icons or static files
├── src/        
│   ├── assets/                        # Images or static assets (optional)
│   ├── components/                    # Reusable UI components
│   │   ├── SubjectList.jsx      
│   │   └── TaskList.jsx        
│   ├── styles/                      # Global or modular CSS
│   │   └── global.css    
│   ├── App.jsx                      # Main component
│   └── main.jsx                 # Entry point
├── .gitignore                   # Files to ignore in Git
├── index.html                   # Main HTML file
├── package.json                 # Project metadata and dependencies
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation



## Technologies Used

- React.js (Functional Components with Hooks)
- Vite (Fast bundler and dev server)
- JavaScript (ES6+)
- CSS (for styling)

## Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/study-planner.git

# Navigate to the project directory
cd study-planner

# Install dependencies
npm install

# Start the development server
npm run dev
