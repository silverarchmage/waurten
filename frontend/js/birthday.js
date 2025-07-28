
  const dayInput = document.getElementById("birthDay");
  const monthInput = document.getElementById("birthMonth");
  const yearInput = document.getElementById("birthYear");
  const errorText = document.getElementById("birthdateError");

  const inputs = [dayInput, monthInput, yearInput];

  // Auto-focus et navigation
  inputs.forEach((input, index, arr) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, ""); // digits only
      if (input.value.length === input.maxLength && index < arr.length - 1) {
        arr[index + 1].focus();
      }
      hideError(); // Masquer l'erreur dès qu'on saisit
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
        arr[index - 1].focus();
      }
    });

    input.addEventListener("focus", hideError); // Masquer si focus
  });

  function hideError() {
    errorText.style.display = "none";
  }

  function isValidDate(j, m, a) {
    const d = new Date(`${a}-${m}-${j}`);
    return (
      d.getFullYear() === a &&
      d.getMonth() + 1 === m &&
      d.getDate() === j
    );
  }

  yearInput.addEventListener("blur", () => {
    const j = parseInt(dayInput.value);
    const m = parseInt(monthInput.value);
    const a = parseInt(yearInput.value);

    if (dayInput.value && monthInput.value && yearInput.value) {
      if (!isValidDate(j, m, a)) {
        errorText.textContent = "Date invalide";
        errorText.style.display = "block";
      } else {
        hideError();
      }
    } else {
      hideError();
    }
  });