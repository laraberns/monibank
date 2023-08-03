 // chama funcao validaIdade
export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value)

     // verifica se validade idade eh false, e caso seja, adiciona customValidity
    if(validaIdade(dataNascimento)){
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}

 // verifica se data de nascimento eh maior que 18 anos
function validaIdade(data) {
    // data de hoje
    const dataAtual = new Date()
    // pega data de nascimento e acrescenta 18 anos mais
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    // verifica se data atual eh maior ou nao que a data mais 18
    return dataAtual <= dataMais18
}