import ehUmCPF from "./valida-cpf.js"
import ehMaiorDeIdade from "./valida-idade.js"

const camposDoFormulario = document.querySelectorAll("[required]")
const formulario = document.querySelector("[data-formulario]")

// quando clicado submit chama o evento
formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    // salva respostas de cada alvo
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    // salva listaRespostas no localStorage
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas))

    // redireciona pagina quando submit
    window.location.href = './abrir-conta-form-2.html'
})


camposDoFormulario.forEach((campo) => {
    // add evento de quando clica para fora do campo e chama funcao verificaCampo
    campo.addEventListener("blur", () => verificaCampo(campo))

    // tira mensagem automatica de preenchimento invalido
    campo.addEventListener("invalid", evento => evento.preventDefault())
})


// tipos de erro de preenchimento
const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

// mensagens personalizadas de erros
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}


// validacao dos campos
function verificaCampo(campo) {

    // variavel da mensagem de erro
    let mensagem = ""

    // remove mensagem de erro toda vez que clicado
    campo.setCustomValidity("")

    // validacao CPF
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo)
    }
    // validacao data de nascimento> 18
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo)
    }

    // mostra mensagem de erro de acordo com tipo
    tiposDeErros.forEach(erro => {
        // se campo de erro estiver como true, pega mensagem de erro e imprime no console
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
            console.log(mensagem)
        }
    })

    // seleciona mensagemErro de acordo com o input escolhido
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')

    // checa validity do campo
    const validadorDeInput = campo.checkValidity()

    // se campo validity nao estiver valido, imprime mensagem de erro
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem
    } else {
        mensagemErro.textContent = ""
    }
}