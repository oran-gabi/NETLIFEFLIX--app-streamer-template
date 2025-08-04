NetlifeflixWelcome to Netlifeflix, a streaming service concept built with React and Tailwind CSS. This application demonstrates a modern, responsive user interface and dynamic content rendering, complete with features for searching, favoriting movies, and a user menu.Project ScreenshotTo add a screenshot of your deployed app, simply take a picture of your application and replace the placeholder below with a direct link to the image. A good way to get an image link is to upload the screenshot to your GitHub repository and use the file's URL.Key FeaturesResponsive Design: The layout adapts seamlessly to mobile, tablet, and desktop screens.Dynamic Content: The application loads and displays movie data, including a hero section, popular movies, and carousels.Search Functionality: A search bar allows users to filter and find movies.My List: Users can add and remove movies from a personalized "My List" using local storage.Interactive UI: The app features a drop-down user menu and a details modal for movies.Technologies UsedReact: A JavaScript library for building user interfaces. React's component-based architecture makes it ideal for creating reusable UI elements like the MovieCard and CarouselSection.Tailwind CSS: A utility-first CSS framework that enables rapid UI development. The entire styling of the application, including responsiveness, is handled with Tailwind's utility classes.React Hooks (useState, useEffect): Fundamental tools for managing state and side effects in functional components.HTML &  CSS: The foundational languages for structuring and styling the web application.Hooks and FunctionalityThis application leverages several key React hooks to manage its dynamic behavior:useStateThis hook is used to manage the state of the user interface. When state variables are updated, React automatically re-renders the components that use them.const [favorites, setFavorites] = useState([]);Manages the list of movies a user has added to "My List." This state is crucial for displaying the correct movies on the My List page.const [showSearch, setShowSearch] = useState(false);A boolean state that controls the visibility of the search bar. Toggling this state shows or hides the search input field.const [showUserMenu, setShowUserMenu = useState(false);Controls the visibility of the user drop-down menu, allowing it to be shown or hidden with a click.const [showModal, setShowModal = useState(false);Manages the visibility of the movie details modal, which appears when a user clicks on a movie card.useEffectThis hook is used to handle "side effects," such as data fetching, subscriptions, or manually updating the DOM.Data Persistence with useEffect:useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('my-list'));
  if (storedFavorites) {
    setFavorites(storedFavorites);
  }
}, []);

useEffect(() => {
  localStorage.setItem('my-list', JSON.stringify(favorites));
}, [favorites]);

The first useEffect runs once on initial component load (because of the empty dependency array []). It checks for and loads any saved favorites from the browser's local storage, ensuring your list persists between sessions.The second useEffect runs every time the favorites state changes (because favorites is in the dependency array [favorites]). It saves the updated favorites array to local storage, keeping the data synchronized.Deployment GuideFollow these steps to deploy your Netlifeflix app to GitHub and Netlify.Step 1: Run the App Locally (Optional)Make sure you have Node.js and npm installed.Install the project dependencies:npm install

Start the development server:npm run dev

Your application will be running at http://localhost:5173.Step 2: Initialize Git and Push to GitHubOpen your terminal and navigate to your project folder.Initialize a new Git repository:git init

Add all your project files to the staging area:git add .

Commit your changes with a descriptive message:git commit -m "Initial commit of the Netlifeflix app"

Go to GitHub and create a new, empty repository.Copy the remote repository URL provided by GitHub.Connect your local repository to the remote one:git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main

Push your code to GitHub:git push -u origin main

Step 3: Deploy to NetlifyGo to Netlify and log in.Click the "Add new site" button, then select "Import an existing project."Choose "Deploy with GitHub."Authenticate your GitHub account and select the repository you just pushed (netlifeflix).Netlify will automatically detect that it's a Vite + React project.Build command: npm run buildPublish directory: distClick "Deploy site."Netlify will now build and deploy your application. In a few moments, your site will be live and accessible via a unique URL. Any time you push new changes to the main branch of your GitHub repository, Netlify will automatically rebuild and redeploy your app.