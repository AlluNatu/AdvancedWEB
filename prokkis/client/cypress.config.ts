import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async clearDatabase() {
          return fetch("http://localhost:3002/api/clearDatabase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
            .then(async (res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
              console.log("Database cleared:", data);
              return null;
            })
            .catch((err) => {
              console.error("Error clearing database:", err);
              throw err;
            });
        },
      });
    },
  },
});
