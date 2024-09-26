# GitHub Battle

GitHub Battle is a React application that allows users to compare the popularity of GitHub repositories. Users can select two GitHub users and battle their repositories based on star counts and other metrics to determine the winner.

## Table of Contents

-  [Features](#features)
-  [Demo](#demo)
-  [Technologies](#technologies)
-  [Installation](#installation)
-  [Usage](#usage)
-  [Scripts](#scripts)
-  [Project Structure](#project-structure)
-  [Contributing](#contributing)
-  [License](#license)
-  [Author](#author)

## Features

-  **Popular Repositories:** View and compare the most popular GitHub repositories based on stars.
-  **Battle Mode:** Enter two GitHub usernames to battle their repositories and see who has a higher score.
-  **Responsive Design:** Optimized for various screen sizes with a clean and intuitive UI.
-  **Dark/Light Theme Toggle:** Switch between dark and light themes for better user experience.
-  **Tooltips:** Get more information about repositories and users with interactive tooltips.
-  **Lazy Loading:** Efficiently load components with React's lazy and Suspense for better performance.

## Demo

[Live Demo](https://github-battle-wrji-gamma.vercel.app/)

## Technologies

-  **Frontend:** React, React Router DOM
-  **Build Tools:** Webpack, Babel
-  **Styling:** CSS
-  **Utilities:** PropTypes for type checking

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/github-battle.git
   cd github-battle
   ```

2. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies:

   ```bash
   npm install
   ```

## Usage

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:8080/` by default.

2. **Build for Production**

   To create an optimized production build:

   ```bash
   npm run build
   ```

   The build output will be in the `dist` folder.

## Scripts

-  **`npm run dev`**: Starts the development server with Webpack Dev Server.
-  **`npm run build`**: Builds the application for production with optimized assets.

## Project Structure

-  **`app/`**: Contains all the React components and styles.
   -  **`components/`**: Reusable React components.
   -  **`index.jsx`**: Entry point of the React application.
   -  **`index.css`**: Global styles.
-  **`package.json`**: Lists project dependencies and scripts.
-  **`webpack.config.js`**: Configuration for Webpack bundler.
-  **`.gitignore`**: Specifies files and directories to be ignored by Git.
-  **`README.md`**: Documentation for the project.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [ISC License](LICENSE).

## Author

**Dimitrios Tsiakmakis**

---
