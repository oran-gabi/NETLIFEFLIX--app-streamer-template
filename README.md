# 🎬 Netlifeflix

**Netlifeflix** is a modern streaming service concept built with **React** and **Tailwind CSS**, showcasing a sleek, responsive design and dynamic content. The application includes movie browsing, a search interface, a custom “My List” feature, and a user dropdown menu—all with a clean UI and interactive experience.

> 💡 This is a demo project that demonstrates best practices in building React applications using functional components, hooks, and local storage for state persistence.
![Netlifeflix Screenshot](https://raw.githubusercontent.com/oran-gabi/NETLIFEFLIX--app-streamer-template/main/assets/images/Netlifeflix-exp.JPG)

---

## 📸 Project Screenshot

![Netlifeflix Screenshot](./screenshot.png)  
> _Tip: Replace this placeholder with your deployed screenshot! You can upload the image to your GitHub repo and use its raw URL here._

---

## ✨ Key Features

- **Responsive Design** – Seamlessly adapts to mobile, tablet, and desktop.
- **Dynamic Content Rendering** – Loads and displays movie data dynamically.
- **Search Functionality** – Allows users to search and filter through movies.
- **"My List" with Local Storage** – Add or remove movies to a personal list, persisted across sessions.
- **User Menu** – Dropdown user menu for a personalized feel.
- **Movie Modal** – Click a movie to view its details in a modal.

---

## 🛠️ Technologies Used

![React](https://skillicons.dev/icons?i=react)
![TailwindCSS](https://skillicons.dev/icons?i=tailwind)
![Vite](https://skillicons.dev/icons?i=vite)
![HTML](https://skillicons.dev/icons?i=html)
![CSS](https://skillicons.dev/icons?i=css)
![JavaScript](https://skillicons.dev/icons?i=javascript)

- **React**: Component-based UI library for building dynamic interfaces.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Vite**: Lightweight and fast frontend build tool.
- **React Hooks**: `useState`, `useEffect` for state and side-effect management.
- **Local Storage**: Persistent client-side data management.

---

## ⚙️ Hooks & Functionality

### `useState`
Manages UI interactivity and user preferences.

```js
const [favorites, setFavorites] = useState([]);
const [showSearch, setShowSearch] = useState(false);
const [showUserMenu, setShowUserMenu] = useState(false);
const [showModal, setShowModal] = useState(false);
