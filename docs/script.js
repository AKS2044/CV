function calculateTimePassed() {
  const dateElements = document.querySelectorAll("#date");

  const regex = /([A-Za-z]+)\s*(\d{4})/g;
  const monthsMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  dateElements.forEach((element) => {
    const dateText = element.textContent.trim();
    const matches = [...dateText.matchAll(regex)];

    if (matches.length === 0) {
      console.warn(`Failed to extract date from: ${dateText}`);
      return;
    }

    const [startMonth, startYear] = matches[0].slice(1);
    const startDate = new Date(parseInt(startYear), monthsMap[startMonth]);

    const endDate = matches[1]
      ? new Date(parseInt(matches[1][2]), monthsMap[matches[1][1]])
      : new Date();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    const yearsText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
    const monthsText =
      months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";

    const finalText = [yearsText, monthsText].filter(Boolean).join(" ");

    if (finalText) {
      element.textContent += ` (${finalText})`;
    }
  });
}

const toggleButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";

  themeIcon.style.opacity = "0";
  setTimeout(() => {
    themeIcon.src = isDark ? "img/dark.png" : "img/light.png";
    themeIcon.style.opacity = "1";
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
    themeIcon.src = "img/dark.png";
  }
});

toggleButton.addEventListener("click", toggleDarkMode);

calculateTimePassed();
