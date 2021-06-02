const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lenEl = document.getElementById('len');

const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');

const generateEl = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=';

// generate random password
function getPwd(str) {
	const length = lenEl.value;
	let password = str
		.split('')
		.sort(function () {
			return Math.random() - 0.5;
		})
		.join('');

	return password.slice(0, length);
}

generateEl.addEventListener('click', () => {
	let dict = '';
	if (upperEl.checked) {
		dict += upperLetters;
	}
	if (lowerEl.checked) {
		dict += lowerLetters;
	}
	if (numberEl.checked) {
		dict += numbers;
	}
	if (upperEl.checked) {
		dict += upperLetters;
	}
	if (symbolEl.checked) {
		dict += symbols;
	}
	if (dict.length === 0) {
		pwEl.innerText = '';
	} else {
		pwEl.innerText = getPwd(dict);
	}
});

copyEl.addEventListener('click', () => {
  const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});
