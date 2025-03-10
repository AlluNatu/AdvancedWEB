# CT30A3204 Advanced Web Applications

This is repository for my course I completed in LUT University while doing my Bachelors Degree in Computer Science.

This is for my course I did (LUT University) CT30A3204 Advanced Web Applications. Which is worth 6 ECTS.

## Learning objectives

After completing the course, I am able to:

    1. Create web-based software products

    2. Understand the evolution of web software and how it led to current online environment

    3. Design and implement complex software systems using web-based software and APIs

    4. Understand and solve issues related to web environment, such as authentication and security

    5. Solve real world problems and design online web systems using requirements based on these problems

## Course content
        ○ TypeScript

        ○ Node.js

        ○ Express

        ○ Template engines

        ○ MongoDB

        ○ React

        ○ Authentication and authorization

        ○ APIs

## Grading

I have not yet got a grade for this course. Will be updated as soon as I get one.


# Assignment descriptions

## Week 1
### Dog Wiki with Pictures  

**Overview:**  
Create a responsive info page about dog breeds using JavaScript and APIs. The page should dynamically generate breed entries, including images and descriptions.  

**Requirements:**  

1. **JavaScript HTML Generator**  
   - Generate at least five dog wiki items using JavaScript (`createElement`, `appendChild`).  
   - Use the provided HTML template inside a `<div class="container">`.  
   - Each wiki-text should contain 70-120 words.  

2. **Dog Image API**  
   - Fetch breed images from [Dog CEO API](https://dog.ceo/dog-api/).  
   - Each item should have a breed name and a corresponding random image.  

3. **Mobile-First CSS**  
   - Ensure a good layout on mobile devices.  
   - Add `<meta name="viewport" content="width=device-width, initial-scale=1">`.  
   - Set `.wiki-img` width to 100% and add margins, padding, and `box-shadow` for better spacing.  

4. **Media Queries (Desktop View)**  
   - Apply a media query for screens `≥ 600px`.  
   - Use `flex` and `row-reverse` to align text and images side by side.  
   - Set `min-width` and `max-width` of `.wiki-text` and `.img-container` to 50%.  
   - Wrap content in `.container`, set `max-width: 960px`, and center it with `margin: 0 auto`.  

5. **Fetch Wiki Text from Wikipedia**  
   - Use [Wikipedia API](https://en.wikipedia.org/api/rest_v1/) to fetch breed summaries.  

**Resources:**  
- [fetch() documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)  


## Week 2
### **Introduction to TypeScript**  

Create a TypeScript console application covering Types, Interfaces, and Generics.  

🔹 **Before you start:** Install [Node.js](https://nodejs.org/) and configure TypeScript.  
🔹 **Scoring:** 50% for correct functionality, 50% for proper TypeScript usage.  

---

### **Requirements:**  

1️⃣ **Set Up TypeScript**  
- Initialize TypeScript and modify `tsconfig.json`:  
  ```json
  {
    "target": "ESNext",
    "outDir": "./dist",
    "noEmitOnError": true
  }
  ```  
- Create `app.ts` that prints `"Hello World!"` when running:  
  ```sh
  tsc && node dist/app.js
  ```  

2️⃣ **Define `TVehicle` Type**  
- Create a `TVehicle` type with:  
  ```ts
  type TVehicle = { model: string; color: string; year: number; power: number };
  ```  
- Instantiate:  
  ```ts
  const vehicle: TVehicle = { model: "Boring generic vehicle", color: "Red", year: 1993, power: 60 };
  console.log(vehicle);
  ```  

3️⃣ **Extend Interface `IVehicle`**  
- Create `IVehicle` interface (same as `TVehicle`).  
- Extend into `ICar`, `IBoat`, and `IPlane` with additional attributes:  
  ```ts
  interface ICar extends IVehicle { bodyType: string; wheelCount: number; }
  interface IBoat extends IVehicle { draft: number; }
  interface IPlane extends IVehicle { wingspan: number; }
  ```  
- Instantiate and log:  
  ```ts
  const car: ICar = { model: "Ford Focus", color: "Green", year: 2016, power: 150, bodyType: "Hatchback", wheelCount: 4 };
  const plane: IPlane = { model: "Boeing 777", color: "White", year: 2020, power: 170000, wingspan: 65 };
  const boat: IBoat = { model: "Bella", color: "Black", year: 2022, power: 100, draft: 0.42 };
  console.log(car, plane, boat);
  ```  

4️⃣ **Generic `VehicleService` Class**  
- Create a generic class for storing vehicles:  
  ```ts
  class VehicleService<T> {
    private items: T[] = [];
    add(item: T) { this.items.push(item); }
    list() { return this.items; }
  }
  ```  
- Use it for `cars` and `boats`:  
  ```ts
  const cars = new VehicleService<ICar>();
  const boats = new VehicleService<IBoat>();

  cars.add(car);
  boats.add(boat);

  console.log(cars.list(), boats.list());
  ```  

---

### **Resources:**  
- [TypeScript Tooling in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html)  
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)  
- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/classes.html)  
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/generics.html)


## Week 3
### **First Express Server**  

Create an Express.js server that handles basic GET/POST requests and serves a simple webpage.  

🔹 **Tip:** Use `tsc-watch` and `nodemon` for easier testing:  
```json
"start": "tsc-watch --onSuccess \"nodemon dist/app.js\""
```  

---

### **Requirements:**  

1️⃣ **Hello World Route**  
- Create an Express.js server on port `3000`.  
- Add a GET route to `/hello` that responds with:  
  ```json
  { "msg": "Hello world!" }
  ```  
- **Testing:** Use Postman or UseBruno.  

2️⃣ **ID Echoing**  
- Add a GET route to `/echo/:id` that returns:  
  ```json
  { "id": "your-id-here" }
  ```  
- Example: `GET /echo/dog` → `{ "id": "dog" }`  

3️⃣ **POST Request: Sum of Numbers**  
- Add a POST route to `/sum` that takes an array of numbers from the request body and returns their sum.  
  **Example Request:**  
  ```json
  { "numbers": [1, 2, 3] }
  ```  
  **Response:**  
  ```json
  { "sum": 6 }
  ```  
- **Tip:** Use `express.json()` to handle JSON requests.  

4️⃣ **Front-End & Back-End Communication**  
- Add a `public/` folder with `index.html` and `main.js`.  
- Inside `index.html`, create a form (`id="userForm"`) with name & email input fields (`id="name"`, `id="email"`).  
- In `main.js`, send a POST request to `/users` on form submission with:  
  ```json
  { "name": "John Doe", "email": "john@example.com" }
  ```  
- **Back-End:**  
  - Serve static files (`../public`).  
  - Create `TUser` type with `name` and `email`.  
  - Store users in an array and append new users via POST `/users`.  
  - Respond with `{ "msg": "User successfully added" }`.  

5️⃣ **Render All Users in Front-End**  
- Add a GET route `/users` that returns the user list with `201` status.  
- In `index.html`, add:  
  - Button (`id="getUsers"`)  
  - Unordered list (`id="userList"`)  
- In `main.js`, when the button is clicked, fetch users and display them as:  
  ```
  John Doe - john@example.com
  ```  

---

### **Resources:**  
- [Express Hello World Example](https://expressjs.com/en/starter/hello-world.html)  
- [Express Route Parameters](https://expressjs.com/en/guide/routing.html)  

## Week 4
### **📌 Overview**  
- Create an **Express server** to handle todos.  
- Store data in a **JSON file (data.json)** instead of runtime memory.  
- Implement **CRUD operations** (Create, Read, Update, Delete).  
- Use **forms** to interact with the server.  

---

### **🚀 Requirements:**  

### **1️⃣ Save Users & Todos**  
✅ **Front-End:**  
- Add a form (`id="todoForm"`) with:  
  - Name input (`id="userInput"`)  
  - Todo input (`id="todoInput"`)  
  - Submit button (`id="submit-data"`)  
- On button click, send a **POST** request to `/add`.  

✅ **Back-End:**  
- Create `TUser` type:  
  ```ts
  type TUser = {
    name: string;
    todos: string[];
  };
  ```  
- Store users as an **array of TUser** in `data.json`.  
- If a user already exists, append the new todo instead of creating a new entry.  
- Respond with:  
  ```json
  { "msg": "Todo added successfully for user John." }
  ```  
- Display the message on the webpage.  

---

### **2️⃣ Fetch Users & Display Todos**  
✅ **Front-End:**  
- Add a search form (`id="searchForm"`) with:  
  - Input (`id="searchInput"`)  
  - Button (`id="search"`)  
- On button click, send a **GET** request to `/todos/:id` (e.g., `/todos/jukka`).  

✅ **Back-End:**  
- If the user exists, return their todos.  
- If not, return `{ "msg": "User not found" }`.  
- Display todos as an unordered list `<ul id="todoList">`.  

---

### **3️⃣ Delete Users**  
✅ **Front-End:**  
- When a user is found, show a **"Delete User"** button (`id="deleteUser"`).  
- On button click, send a **DELETE** request to `/delete` with the user’s name.  

✅ **Back-End:**  
- Remove the user from `data.json`.  
- Return `{ "msg": "User deleted successfully." }`.  
- Remove the user from the webpage.  

---

### **4️⃣ Delete Single Todos**  
✅ **Front-End:**  
- Make todos **clickable** (`<a class="delete-task">`).  
- Clicking a todo sends a **PUT** request to `/update`.  

✅ **Back-End:**  
- Remove the clicked todo from the user’s list in `data.json`.  
- Return `{ "msg": "Todo deleted successfully." }`.  
- Update the UI dynamically.  

---

### **5️⃣ Store Data in File System (`data.json`)**  
✅ **Back-End:**  
- Save all data in `data.json`.  
- On server start:  
  - **Check if `data.json` exists**. If not, create it.  
  - **Load existing data** into memory.  
- **Write to file** every time data changes.  

🔹 **Hint:** Use `fsPromises` for async file operations:  
```ts
import { promises as fs } from 'fs';

async function readData() {
    try {
        const data = await fs.readFile('data.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeData(data: TUser[]) {
    await fs.writeFile('data.json', JSON.stringify(data, null, 2));
}
```
- Use `readData()` to **fetch users**.  
- Use `writeData()` to **update `data.json`** after adding/deleting todos.  

---

### **🎯 Final Features Recap:**  
✅ **Add a user & todo** (`POST /add`)  
✅ **Fetch user’s todos** (`GET /todos/:id`)  
✅ **Delete user** (`DELETE /delete`)  
✅ **Delete single todo** (`PUT /update`)  
✅ **Store data persistently in `data.json`**  

---

### **📚 Useful Resources:**  
- [Express File System (fs)](https://nodejs.org/api/fs.html)  
- [fsPromises API](https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options)  


## Week 5

### **Todos to Database**  
Replace the file system with MongoDB.  

#### **1. Save todos to database**  
- Connect MongoDB (`mongodb://127.0.0.1:27017/testdb`).  
- Create a `models` directory under `src`.  
- Define `User` model with `name` (string) and `todos` (array of `{ todo: string }`).  
- Use `/add` route to add todos, ensuring users are stored properly.  

#### **2. Get todos from database**  
- Modify `/todos/:id` to fetch a user’s todos from MongoDB.  
- Display the todos in a list on the front-end.  

#### **3. Delete todos from database**  
- Modify `/update` route to delete a selected todo from the database.  

#### **4. Update todos**  
- Add a `checked` (boolean, default `false`) field to the `Todo` schema.  
- Create a PUT `/updateTodo` route to toggle `checked` status.  
- Add checkboxes (`id="myCheckbox"`, `class="checkBoxes"`) to update status instantly.  

#### **5. Additional styling**  
- Use **Materialize CSS** via CDN.  
- Wrap content inside a `.container` div with two `.col` divs.  
- Style buttons (`.btn`).  
- Add a **Materialize Navbar** above the container.  
- Modify list items:  
  - Wrap `<li>` in `<label>`  
  - Add a checkbox inside `<label>`  
  - Include a `<span>` with an `<a>` for deleting todos.  

#### **Useful Links**  
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)  
- [Materialize Navbar](https://materializecss.com/)  
- [Mongoose Docs](https://mongoosejs.com/)  


## Week 6
### **Week 6 - Tasks Summary**  

#### **1. Frontpage with Inputs**  
- Create a frontend form (`id="offerForm"`) for selling items.  
- Form inputs: `title` (id="title"), `price` (id="price"), `description` (id="description"), and `image` (id="image", type="file").  
- Labels for all inputs (except file) and a submit button.  
- Backend: Create `/upload` POST route to save offers (title, description, price) in the `offers` collection.  

#### **2. Image Uploading to Database**  
- Create `Image.ts` model (`filename`, `path`, `_id`).  
- Modify `Offer.ts` to include `imageId` (string).  
- Use **Multer** to handle image uploads to `./public/images`.  
- Generate filenames as `originalName_uuid.extension` (use `uuid v4`).  
- Save image info in the `images` collection and store its `_id` in `imageId` of the corresponding offer.  
- Offers should work with or without images.  

#### **3. Fetch & Display Offers on Frontpage**  
- Create `/offers` GET route to return all offers with their images.  
- Frontend:  
  - Add a div (`id="offersContainer"`) to display offers.  
  - Each offer should be inside a div (`class="offerDiv"`).  
  - Include an image and `<p>` elements for title, description, and price.  
  - Offers should update dynamically on page load and after a new upload.  

#### **4. Styling with Materialize CSS**  
- Wrap everything in a `.container` div.  
- **Form styling:**  
  - `class="card-panel"`  
  - Inputs inside `div.input-field`  
  - Description textarea: `class="materialize-textarea"`  
  - File upload inside `div.file-field` → nested `btn` (upload text + file input) & `file-path-wrapper`.  
  - Submit button: `class="btn waver-effect waves-light"`.  
- **Offer display:**  
  - Each `offerDiv`: `class="col s12 m6 l4"`.  
  - Inside it:  
    - `card hoverable` div  
    - `card-image` div with `img.responsive-img`  
    - `card-title` span for the title  
    - `card-content` div for price & description  

#### **Useful Links**  
- [TypeScript Docs](https://www.typescriptlang.org/)  
- [UUID](https://www.npmjs.com/package/uuid)  
- [Multer](https://www.npmjs.com/package/multer)  


## Week 7
### **Session Authentication - Project Summary**  

#### **1. User Registration**  
- Web app runs on **port 3000**.  
- **POST** `/api/user/register`:  
  - Accepts `{ email, password }` in JSON.  
  - Hash password using **bcrypt.js**.  
  - Store users in a list.  
  - Prevent duplicate emails (return **403** if email exists).  
  - Respond with the created user (email + hashed password).  
- **GET** `/api/user/list`: Returns a list of all registered users.  

#### **2. User Login with JWT**  
- **POST** `/api/user/login`:  
  - Validates credentials and returns a **JWT token**.  
  - Use **jsonwebtoken** to generate the token.  
  - Token payload should include `{ email }`.  
  - Store **SECRET** key in **environment variable** (`.env`).  
  - Token returned as JSON `{ token: "jwt_token_here" }`.  

#### **3. Registration & Login Pages**  
- **Register Page (`register.html`)**  
  - Form (`id="registerForm"`) with **email** & **password** inputs.  
  - On success, redirect to `/login.html`.  
- **Login Page (`login.html`)**  
  - Form (`id="loginForm"`) with same input IDs.  
  - On success, store **JWT token** in **localStorage** (`"token"`) and redirect to `/index.html`.  

#### **4. Protected Route (`/api/private`)**  
- Middleware **validates token** from the request **Authorization header** (`Bearer token`).  
- **GET** `/api/private`:  
  - If authenticated, return `{ message: "This is protected secure route!" }` (status **200**).  
  - If unauthorized, return status **401**.  
- **Redirect logic in `index.html`**:  
  - If no token → redirect to `/login.html`.  
  - If token exists → fetch `/api/private` to verify authentication.  

#### **5. Logout Functionality**  
- In **`index.html`**, add a **logout button** (`id="logout"`).  
- Clicking **removes token from `localStorage`** and redirects to `/login.html`.  

#### **Useful Links**  
- [bcrypt](https://www.npmjs.com/package/bcrypt)  
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)  


## Week 8
### **Week 8: Authentication & Role-Based Access Control (RBAC) for a Forum Application**

#### **1. User Registration and Login**
- **POST** `/api/user/register/`:  
  - Create a user with email, username, password, and an optional `isAdmin` field.  
  - **Password hashing**: Use **bcrypt.js** to hash passwords.  
  - **Email uniqueness**: Check for duplicate emails before creating a user.  
  - **Response**: On successful registration, return the created user as JSON.  
  - If email is already used, return **403 Forbidden**.  
  - User model (`User.js`), schema should include:  
    - `email (string)`
    - `password (string)`
    - `username (string)`
    - `isAdmin (boolean)`  

- **POST** `/api/user/login`:  
  - Validate user credentials and return a **JWT**.  
  - **JWT Payload**: `_id`, `username`, `isAdmin`.  
  - If user doesn't exist, return **404 Not Found**.  
  - If password is incorrect, return **401 Unauthorized**.  

- **Environment variable**: Use **SECRET** for JWT key. 

#### **2. Input Validation**
- **Validation**: Use **express-validator** to sanitize and validate inputs.  
  - **Username**: Trim and escape input. Min length: 3, Max length: 25 characters.  
  - **Email**: Trim, escape, and validate proper email format.  
  - **Password**: Ensure strong password with the following rules:  
    - Min 8 characters  
    - At least 1 uppercase letter  
    - At least 1 lowercase letter  
    - At least 1 number  
    - At least 1 special character (`#!&?`)
  - If any validation fails, return **400 Bad Request**.

#### **3. Server-side Routing and Topics**
- **Topic Model** (`Topic.js`):
  - **Schema**: `title (string)`, `content (string)`, `username (string)`, `createdAt (Date)` (auto-generated).

- **Middleware** (`validateToken.js`):
  - **For authenticated users**: Check for valid JWT token, return **401 Unauthorized** if not found.  
  - **For admin users**: Check `isAdmin` attribute, return **403 Forbidden** if not admin.

- **Routes**:
  - **GET** `/api/topics`: Return a list of all topics from the database.  
  - **POST** `/api/topic`: Create a new topic. Requires authentication (JWT).  
  - **DELETE** `/api/topic/:id`: Admin only route to delete a topic by ID. If successful, return **200 OK** with message `"Topic deleted successfully."`.

#### **4. Frontend Implementation**
- **`register.html`**:
  - Form with inputs for `email`, `username`, `password`, and `isAdmin` (checkbox).
  - **Submit**: Send a **POST** request to `/api/user/register/`. On success, redirect to **index.html**.

- **`index.html`**:
  - **Navbar**: Include a login form (email and password) and a redirect button to the registration page.
  - **Topic Form** (`topicForm`):  
    - Input fields: `topicTitle` and `topicText`.  
    - Button: `postTopic`. Send **POST** request to create a new topic.
  - **Display Topics**:  
    - For each topic, show:
      - Title  
      - Content  
      - Created by (username)  
      - Created at timestamp.  
      - **Delete button** (only visible to admin users).  
  - **Fetch Topics** on page load using **GET** request to `/api/topics`.

  **Event listeners**:
  - **Register Form**: Trigger `submit` event to handle the POST request.  
  - **Login Form**: Trigger `submit` event and store **JWT token** in **localStorage** upon successful login.  
  - **Topic Form**: Trigger `submit` event to send topic data to the backend.  
  - **Delete Button**: Send **DELETE** request for topics that the admin can delete.

#### **5. MaterializeCSS Styling**
- **Navbar**:  
  - Use **MaterializeCSS** styles to create a responsive, attractive navbar with login form and registration redirect button.  
  - Ensure **login form** is inside a `<form>` with **class row** and each input is inside `div` with classes `input-field col` and `navbar-input`.

- **Topic Form**:  
  - **Materialize** class for `textarea` (e.g., `materialize-textarea`) and button (e.g., `btn waves-effect waves-light`).  

- **Topic Cards**:  
  - Use Materialize card layout with classes: `card`, `z-depth-2`, `hoverable`, `grey lighten-2`.  
  - Inside the card: 
    - `card-content` for title, content, and timestamp.  
    - `card-action` for the delete button.

- **Responsive Design**:  
  - Make sure the design is responsive and works well across different devices.

#### **Useful Links**:
- [bcrypt](https://www.npmjs.com/package/bcrypt)  
- [express-validator](https://express-validator.github.io/docs/)  
- [MaterializeCSS](https://materializecss.com/)  
- [JWT](https://www.npmjs.com/package/jsonwebtoken)  

## Week 9

**Assignment: Introduction to React**

This week, we'll explore React basics. Keep the [React documentation](https://reactjs.org/docs/getting-started.html) handy! All examples use React functions, not classes.

### General Notes:
- For CodeGrade tests, modify your `package.json` and `tsconfig.app.json` as follows:
  - In `package.json` under `"scripts"`: Add `"test": "jest"`.
  - In `tsconfig.app.json` under `compilerOptions`: Add `"jsx": "react-jsx"` and `"esModuleInterop": true`.
  - Outside `compilerOptions`: Add `include` and `exclude` paths.

### Tasks and Requirements:

1. **Create Vite React App:**
   - Initialize with Vite and TypeScript.
   - Create a `<div className="App">` with an `<h1>` element containing "Hello World!".

2. **Optional Local Testing:**
   - Download test zip from the provided link.
   - Create a `__test__` directory inside `src` and copy the zip contents.
   - To run tests: `npm run test`.
   - Add necessary dependencies for testing.

3. **Create Components:**
   - Create `MyContainer.tsx` and `MyList.tsx` inside a `components` folder in `src`.
   - Nest components: `App.tsx` includes `MyContainer.tsx`; `MyContainer.tsx` includes `MyList.tsx`.

4. **Props, Lists, and Keys:**
   - `MyList.tsx` should accept `header` and `items` props.
   - Define types: `Item` (with `id` and `text` attributes), and `ListProps` (with `header` and `items` attributes).
   - Render items as `<li>` elements inside an ordered list using `id` as key.

5. **Component States:**
   - Manage `items` state in `MyContainer` and pass it to `MyList`.
   - Add a `<textarea>` and `<button>` in `MyContainer` to append new items to the state.

6. **Conditional Rendering:**
   - Style clicked `<li>` items with `text-decoration: "line-through"`.
   - Use `updateList()` function in `ListProps` to manage state.

### Useful Links:
- [Vite](https://vitejs.dev/)
- [Creating and Using React Components](https://www.w3schools.com/react/react_components.asp)
- [useState](https://reactjs.org/docs/hooks-state.html)
- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
- [Functions as Props](https://reactjs.org/docs/faq-functions.html)

## Week 10

**Assignment: Advanced React Features**

This week we'll dive into advanced React features like `useEffect`, and third-party packages such as `react-router-dom`, `react-i18next`, and simple pagination. Tasks 1, 2, 4, and 5 have tests provided.

### General Notes:
- For task 3 to pass CodeGrade, change the start script from "dev" to "start" and configure port 3000 in `vite.config.ts`.
- Follow Week 9 instructions for other configurations.

### Tasks and Requirements:

1. **React Router:**
   - Create a new Vite project with three components: `<About>`, `<MyContainer>`, and `<Header>` in `/src/components`.
   - Install React Router: `npm install react-router-dom`.
   - Set up routes: '/' renders `<MyContainer>`, '/about' renders `<About>`, both routes render `<Header>`.
   - Create a navbar in `<Header>` with links to "Home" and "About" pages. Add buttons for "FI" and "EN" for language change.

2. **useEffect:**
   - Fetch data from the provided API in `<About>` using `useEffect`.
   - Display each item's title and body inside a div with the item id as key.
   - Install dependencies for task 3: `npm i react-i18next i18next i18next-http-backend i18next-browser-languagedetector`.

3. **Internationalization (i18n):**
   - Add support for multiple languages using `react-i18next`.
   - Set default language to English with support for Finnish.
   - Add buttons in `<Header>` for changing languages. Translate the text accordingly.
   - Do not add translations to `<About>` component.

4. **About Component Grid:**
   - Add CSS styling for the `<About>` page to display items in a grid.
   - Create a `styles` directory in `src` and add `About.css` with specific grid styles.

5. **Pagination:**
   - Create pagination for the `<About>` page.
   - Display the first 12 items by default and load more items when "Show more" button is pressed.
   - Use `useState` to manage the number of visible items.

### Useful Links:
- [React Component Styling](https://reactjs.org/docs/faq-styling.html)
- [useEffect React Docs](https://reactjs.org/docs/hooks-effect.html)
- [React Router Docs](https://reactrouter.com/web/guides/quick-start)

## Week 11

**Assignment: Advanced React Features with Material UI**

This week, we'll create a joke generator app using Material UI, `useEffect` clean-up, and custom hooks. The app will generate random jokes and save selected ones.

### Requirements and Scoring

1. **Material-UI:**
   - Install and use Material UI (latest version v6).
   - Create an `AppBar` in `Header.tsx` with two `<Button>` components: "home" ("/") and "saved" ("/saved").
   - Use React Router for navigation. Use `react-router-dom` Links inside Material-UI buttons to avoid full page loads.

2. **Fetching a Joke with useEffect:**
   - Create `FrontPage.tsx` with a Material UI button to fetch a random joke from [Joke API](https://official-joke-api.appspot.com/random_joke).
   - Use `useEffect` for fetching jokes, with `AbortController` for graceful termination.
   - Use `useState` to track fetch status, displaying "Loading a joke..." while fetching, and show the joke in a Material UI `Card` component upon completion.
   - Create an interface or type for the joke data.

3. **Creating Custom Hook:**
   - Create a custom hook `useJokes` in `src/hooks/useJokes.ts` for saving jokes.
   - The hook should manage `savedJokes` state and have a `saveJoke` function.
   - Add a "Save joke" button in `FrontPage.tsx` to save jokes using the custom hook.

4. **Display Jokes on Saved Page:**
   - Create `SavedPage.tsx` to display all saved jokes using the custom hook.
   - Display jokes in Material UI `Card` components, and show "No saved jokes yet." if none exist.
   - Initialize the custom hook in a higher-level component (e.g., `App.tsx`) and pass it down as props.

5. **Deleting Saved Jokes:**
   - Modify the custom hook to include a `deleteJoke` function for removing jokes by ID.
   - Add a delete button in the `SavedPage.tsx` Card component to remove jokes when clicked.

### Useful Links:
- [useEffect Hook](https://reactjs.org/docs/hooks-effect.html)
- [Material UI](https://mui.com/)
- [React Custom Hooks](https://reactjs.org/docs/hooks-custom.html)
- [useEffect Clean Up](https://reactjs.org/docs/hooks-effect.html#cleaning-up-an-effect)


## Week 12

**Assignment: Creating a Full-Stack Application**

This week, we'll create a full-stack app by integrating a server-side Node application with a client-side React application, and configuring both development and production environments.

### Requirements and Scoring

1. **Client Setup:**
   - Create a project with both Express and React in the same folder.
   - Initialize a React app with Vite and remove default code from `App.tsx`, adding an `<h1>` element with "books".
   - Run `npm init` in the root folder and update `package.json` to include the provided scripts.
   - Ensure React runs on port 3000.

2. **Express and Mongo Setup:**
   - Create a `server` folder and initialize a TypeScript Node application.
   - Update `package.json` to include necessary scripts for both client and server dependencies.
   - Install `nodemon` and `tsc-watch`, and set up scripts for running the Express server in development mode.
   - Attach MongoDB, create a `Books` collection, and set up a POST route `/api/book/` to save books in JSON format.

3. **Connecting React and Express for Development Environment:**
   - Proxy React API requests to `http://localhost:1234` for development.
   - Enable CORS in the server for development environment.
   - Create a React form to send book data to the server via the POST route `/api/book/`.
   - Use the attributes specified in Table 1 for form elements.

4. **Advanced Routing:**
   - Install `react-router-dom` in the client folder.
   - Show book information on a new page `/book/bookName` after submission.
   - Ensure URLs are URL-encoded for spaces.
   - Display a 404 message if the user navigates to a non-existent page.

5. **Building the Application for Production Environment:**
   - Modify `package.json` to include a "build" script for compiling the React project.
   - Serve the built React application using the Express server.
   - Add necessary scripts to `server/package.json` for starting the server in production mode.
   - Configure the Express server to serve static files from the `../client/build` folder.
   
### Table 1. Elements for Sending Book Information
| Element | id      | type   |
|---------|---------|--------|
| input   | name    | string |
| input   | author  | string |
| input   | pages   | number |
| input   | submit  | submit |

### Useful Documents and Links:
- [React Router](https://reactrouter.com/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [MongoDB](https://docs.mongodb.com/)

# Project

**Project Work**

### Introduction:
Implement a system for users to register, log in, and post cards to a kanban board, similar to Trello. Non-authenticated users cannot see anything. Data must be saved to a database without using CMS (e.g., WordPress, Drupal). Documentation is required. Basic features give 25 points.

### Mandatory Requirements:
- **Backend Implementation:** 
  - Use Node.js (Express, Meteor, etc.)
  - No solutions with Java, PHP, Perl, Python, Ruby.
- **Database Utilization:**
  - Use MongoDB, MariaDB, or any suitable database.
- **Authentication:**
  - Users can register and log in (JWT or session-based).
  - Only authenticated users can see, add, or remove columns/cards.

### Features:
Authenticated users can:
- Add/remove/rename columns on their board.
- Add/move/remove cards on their board.
- Move cards up/down and between columns (buttons or drag and drop).
- Logout.

Non-authenticated users can:
- Register and login.

### Additional Features (Optional):
| Feature | Max Points |
|---------|-------------|
| Utilization of frontside framework (React, Angular, Vue) | 3 |
| Cards reorderable with drag and drop | 2 |
| Columns reorderable | 1 |
| User can set card color | 1 |
| Login with Facebook, Google, etc. (Passport.js) | 3 |
| Admin account managing all users/boards | 3 |
| Accessibility testing | 3 |
| Search filter for cards with keywords | 3 |
| Editable content with double-click | 4 |
| User profiles with images | 3 |
| Cards with comments | 3 |
| Timestamps for cards/comments | 4 |
| Cards have estimated completion time | 1 |
| Register time spent on tasks/cards | 1 |
| Translation of UI in multiple languages | 2 |
| Multi-user collaboration on same board | 5 |
| Unit tests and automated testing (e.g., Cypress) | 5 |

### Penalties:
| Issue | Points |
|-------|--------|
| Application does not work | -100 |
| No documentation | -100 |
| Missing parts (e.g., no database, authentication failure) | 0 – -25 |
| Poor TypeScript usage (continuous use of `any` type) | 0 – -10 |
| Inappropriate content (hate speech, memes) | -100 |
| Code not written/commented in English | -10 |
| Code not commented at all | -10 |
| Code not properly commented | -5 |

### Notes:
- Front and backend can be different implementations.
- Projects using more than 60k ports will not be graded.

### Submission:
Submit your code via link in Moodle to CodeGrade.

### Plagiarism:
All projects will be checked for plagiarism and incidents reported.

---

Best of luck with your project work! 🚀
