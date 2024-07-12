document.addEventListener("DOMContentLoaded", function () {
  const lengthSlider = document.getElementById("password-length");
  const lengthOutput = document.getElementById("length-output");
  const uppercaseCheckbox = document.querySelector("#uppercase .checkbox");
  const lowercaseCheckbox = document.querySelector("#lowercase .checkbox");
  const numbersCheckbox = document.querySelector("#numbers .checkbox");
  const specialCheckbox = document.querySelector("#symbols .checkbox");
  const generateButton = document.getElementById("generate");
  const copyButton = document.getElementById("copy");
  const generatedPassword = document.getElementById("generatedPassword");

  lengthOutput.textContent = lengthSlider.value;

  lengthSlider.addEventListener("input", function () {
    lengthOutput.textContent = lengthSlider.value;
  });

  generateButton.addEventListener("click", function () {
    const length = parseInt(lengthSlider.value);
    const useuppercase = uppercaseCheckbox.checked;
    const uselowercase = lowercaseCheckbox.checked;
    const usenumbers = numbersCheckbox.checked;
    const usespecial = specialCheckbox.checked;

    const password = generatePassword(
      length,
      useuppercase,
      uselowercase,
      usenumbers,
      usespecial
    );

    generatedPassword.textContent = password;
    copyButton.disabled = false;

    const passwordStrength = measurePasswordStrength(password);
    const strengthValueElement = document.getElementById("strength-value");
    strengthValueElement.textContent = passwordStrength;

    switch (passwordStrength) {
      case "Dåligt":
        strengthValueElement.style.color = "white";
        break;
      case "Svagt":
        strengthValueElement.style.color = "white";
        break;
      case "Medel":
        strengthValueElement.style.color = "white";
        break;
      case "Starkt":
        strengthValueElement.style.color = "white";
        break;
      default:
        strengthValueElement.style.color = "white";
        break;
    }

    const bars = document.querySelectorAll(".strength-bars .bar");
    bars.forEach((bar) => (bar.style.backgroundColor = "#ccc"));

    switch (passwordStrength) {
      case "Dåligt":
        bars[0].style.backgroundColor = "black";
        break;
      case "Svagt":
        bars[0].style.backgroundColor = "red";
        bars[1].style.backgroundColor = "red";
        break;
      case "Medel":
        bars[0].style.backgroundColor = "#ffa257";
        bars[1].style.backgroundColor = "#ffa257";
        bars[2].style.backgroundColor = "#ffa257";
        break;
      case "Starkt":
        bars[0].style.backgroundColor = "#4abea0";
        bars[1].style.backgroundColor = "#4abea0";
        bars[2].style.backgroundColor = "#4abea0";
        bars[3].style.backgroundColor = "#4abea0";
        break;
      default:
        break; // Inga bars är aktiva
    }
  });

  copyButton.addEventListener("click", function () {
    copyToClipboard(generatedPassword.textContent);
  });

  function measurePasswordStrength(password) {
    let score = 0;

    // Kontrollera lösenordets längd och justera poängen
    if (password.length >= 15) {
      score += 2;
    } else if (password.length >= 10) {
      score += 1;
    } else if (password.length >= 8) {
      score += 0;
    } else if (password.length <= 5) {
      score -= 1;
    }

    // Poäng för varje typ av tecken
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Bestäm lösenordets styrka baserat på poängen
    switch (true) {
      case score >= 0 && score <= 1:
        return "Dåligt";
      case score === 2:
        return "Svagt";
      case score === 3 || score === 4:
        return "Medel";
      case score >= 5:
        return "Starkt";
      default:
        return "Okänt värde";
    }
  }

  function generatePassword(length, uppercase, lowercase, numbers, special) {
    const charset = [];
    if (uppercase) charset.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (lowercase) charset.push("abcdefghijklmnopqrstuvwxyz");
    if (numbers) charset.push("0123456789");
    if (special) charset.push("!@#$%^&*()_+");

    if (charset.length === 0) {
      const messageElement = document.createElement("p");
      messageElement.textContent = "Välj minst en typ av tecken att inkludera.";
      document.body.appendChild(messageElement);
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 3000);
      return "";
    }

    const charsetString = charset.join("");
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetString.length);
      password += charsetString.charAt(randomIndex);
    }

    return password;
  }

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Lösenordet har kopierats till urklipp!");
  }
});
