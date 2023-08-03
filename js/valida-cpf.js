// replace valor digitado com mais de 11 caracteres no CPF para texto sem ". e -" e chama funcoes validadoras
export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "")

    // se tiver algum erro, coloca a customError de mensagem
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido')
    }
}

// verifica se CPF eh numero repetido (nao existe esses casos)
function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf)
}

// validar primeiro digito de CPF
function validaPrimeiroDigito(cpf) {
    let soma = 0
    let multiplicador = 10

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma == 10 || soma == 11) {
        soma = 0
    }

    return soma != cpf[9]
}

// validar segundo digito de CPF
function validaSegundoDigito(cpf) {
    let soma = 0
    let multiplicador = 11

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma == 10 || soma == 11) {
        soma = 0
    }

    return soma != cpf[10]
}