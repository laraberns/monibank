const botaoIniciarCamera = document.querySelector('[data-video-botao]')
const campoCamera = document.querySelector('[data-camera]')
const video = document.querySelector('[data-video]')
const botaoTirarFoto = document.querySelector('[data-tirar-foto]')
const canvas = document.querySelector('[data-video-canvas]')
const mensagem = document.querySelector('[data-mensagem]')
const botaoEnviarFoto = document.querySelector('[data-enviar]')
var imagemUrl = ""

// add evento de clique na imagem
botaoIniciarCamera.addEventListener("click",


    // foi criado async function porque usuario precisa aceitar acesso a camera
    async function () {
        // pede pro navegador iniciar camera (só video)
        const iniciarVideo = await navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })

        // quando iniciar camera a imagem do botao desaparece e a camera aparece
        botaoIniciarCamera.style.display = "none"
        campoCamera.style.display = "block"

        // tag de video recebe como origem o acesso a camera
        video.srcObject = iniciarVideo
    })

// add evento de clique no botao de tirar foto
botaoTirarFoto.addEventListener("click",

    async function () {
        // criou um canvas no contexto 2d e desenhou uma imagem com a posicao da imagem do video quando foi clicado o botao
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

        // transformar imagem gerada no canvas em url
        imagemUrl = canvas.toDataURL("image/jpeg")

        // tirei o campo de camera e pedi para a mensagem aparecer
        campoCamera.style.display = "none"
        mensagem.style.display = "block"
    })


// add evento de clique no botao de enviar foto
botaoEnviarFoto.addEventListener("click", () => {
    // retornou dados salvos no localStorage e transformou em objeto
    const receberDadosExistentes = localStorage.getItem("cadastro")
    const converteRetorno = JSON.parse(receberDadosExistentes)

    // criou novo atributo "imagem" que recebe URL
    converteRetorno.imagem = imagemUrl

    // cria cadastro com info atualizadas (com imagem)
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))

    // envia para pagina de cadastro confirmado
    window.location.href = "./abrir-conta-form-3.html"
})