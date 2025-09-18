const passwordInput= document.getElementById("password")
const copyBtn = document.getElementById("copy-btn")
const lengthSlider = document.getElementById("length")
const lengthValue = document.getElementById("length-value")
const upperCase = document.getElementById("uppercase")
const lowerCase = document.getElementById("lowercase")
const numbers= document.getElementById("numbers")
const symbol = document.getElementById("symbol")
const generateBtn = document.getElementById("generate-button")
const strengthText = document.querySelector(".strength-container p")
const strengthBar =document.querySelector(".strength-bar")
const strengthlabel = document.getElementById("strength-label")

// CHARACTER VARIABLES


const upperCaseLetters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCaseLetters ="abcdefghijklmnopqrstuvwxyz"
const numbersCharacter ="0123456789"
const symbolCharacter ="!@#$%^&*()_+}{[]\';:|/.,<>?~`"

lengthSlider.addEventListener("input", ()=> {
        lengthValue.textContent = lengthSlider.value
    });

    generateBtn.addEventListener("click", makePassword)

    function makePassword() {
        const length = Number(lengthSlider.value)
        const includeUpperCase = upperCase.checked
        const includeLowerCase = lowerCase.checked
        const includeNumbers = numbers.checked
        const includeSymbol = symbol.checked


        if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbol) {
            alert("Please select at least one character type")
            return
        }

        const newPassword = generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbol)
        passwordInput.value = newPassword
        updateStrengthMeter(newPassword);
       
    }
  
    // GENERATE PASSWORD
    function generatePassword(length, upper, lower, number, symbol) {
        let characterList = ""
        if (upper) {
            characterList += upperCaseLetters
        }
        if (lower) {
            characterList += lowerCaseLetters
        }
        if (number) {
            characterList += numbersCharacter
        }
        if (symbol) {
            characterList += symbolCharacter
        }

      let password = ""
      for (let i = 0; i < length; i++) {
        const characterIndex = Math.floor(Math.random() * characterList.length)
        password += characterList[characterIndex];
      }
        return password;
    }

    // UPDATE STRENGTH METER
    function updateStrengthMeter(password) {
        const passwordLength = password.length;
        const upperCriteria = /[A-Z]/.test(password);
        const lowerCriteria = /[a-z]/.test(password);
        const numberCriteria = /[0-9]/.test(password);
        const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let strengthScore = 0;
        strengthScore += Math.min(passwordLength*2, 40); 
        if (upperCriteria) strengthScore += 15;
        if (lowerCriteria) strengthScore += 15;
        if (numberCriteria) strengthScore += 15;
        if (symbolCriteria) strengthScore += 15;

        if (passwordLength < 8){
            strengthScore = Math.min(strengthScore, 40);
        }

        const safeScore = Math.max(5, Math.min(100,strengthScore));

        strengthBar.style.width = safeScore + "%";

        let strengthLabelText = "";
        
        if (safeScore < 40) {
            strengthBar.style.backgroundColor = "#fc8181";
            strengthLabelText = "Weak";
        }
        else if (safeScore < 70) {
             strengthBar.style.backgroundColor = "#f6e05e";
            strengthLabelText = "Moderate";
        }
        else {
             strengthBar.style.backgroundColor = "#68d391";
            strengthLabelText = "Strong";
        }
        strengthlabel.textContent = strengthLabelText;
    }
    // COPY TO CLIPBOARD
    copyBtn.addEventListener("click", () => {
        if (!passwordInput.value) {
            return;
            
        }

            navigator.clipboard.writeText(passwordInput.value)
            .then(() => showCopySuccess())
            .catch((error) => console.log("Failed to copy password", error));
        
    });
    function showCopySuccess() {
        copyBtn.classList.remove ("far" ,"fa-copy");
        copyBtn.classList.add("fas", "fa-check");
        copyBtn.style.color = "#48bb78";

        setTimeout(() => {
            copyBtn.classList.remove("fas", "fa-check");
            copyBtn.classList.add("far", "fa-copy");
            copyBtn.style.color = "";
        }, 1500);
    }
    window.addEventListener("DOMContentLoaded", makePassword());



