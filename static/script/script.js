console.log("JS CONECTADO");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const tel = document.getElementById("tel");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

const checkemail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

function checkPasswordMatch() {
  return password.value === confirmPassword.value ? true : false;
}

function maskPhoneNumber(event) {
  let tel = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(tel)) {
    createDisplayMsgError("O celular deve conter apenas números");
  } else {
    createDisplayMsgError("");
  }

  tel = tel.replace(/\D/g, "");

  if (tel.length > 11) {
    tel = tel.substring(0, 11);
  }

  if (tel.length > 2) {
    tel = `(${tel.substring(0, 2)}) ${tel.substring(2)}`;
  } else if (tel.length > 0) {
    tel = `(${tel}`;
  }

  if (tel.length > 10) {
    tel = tel.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = tel;
}

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkemail(email.value)) {
    createDisplayMsgError("O E-mail digitado não é valido");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const passwordError = checkPasswordStrength(password.value);

  if (passwordError) {
    createDisplayMsgError(passwordError);
    return;
  }

  if (tel.value && /[A-Za-zÁ-ÿ]/.test(tel.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: password.value,
    celular: tel.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}

//formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", function () {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", function () {
  if (email.value && !checkemail(email.value)) {
    createDisplayMsgError("O E-mail digitado não é valido");
  } else {
    createDisplayMsgError("");
  }
});

password.addEventListener("input", () => {
  if (password.value && checkPasswordStrength(password.value)) {
    createDisplayMsgError(checkPasswordStrength(password.value));
  } else {
    createDisplayMsgError("");
  }
});

function checkPasswordStrength(password) {
  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula";
  }
  if (/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiúscula";
  }
  if (!/[\W_]/.test(password)) {
    return "A senha deve ter pelo menos um caractere especial";
  }
  if (!/\d/.test(password)) {
    return "A senha deve ter pelo menos um número";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres";
  }

  return null;
}

tel.addEventListener("input", maskPhoneNumber);
