export const useSystemTheme = () => {
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? (document.documentElement.classList.add("dark"),
      localStorage.setItem("theme", "dark"))
    : (document.documentElement.classList.remove("dark"),
      localStorage.setItem("theme", "light"));
};
