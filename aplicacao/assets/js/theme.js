let imageDataUrl = ""; // Armazenar o URL da imagem

const handleFile = (event) => {
  const file = event.target.files[0];
  const previewImg = document.getElementById("previewImg");
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");

  if (file) {
    if (file.size > 100 * 1024) {
      // Verifica se o arquivo é maior que 100 KB
      loadingBar.style.display = "block";
      loadingText.style.display = "block";

      const reader = new FileReader();

      reader.onload = function (e) {
        imageDataUrl = e.target.result; // Armazenar o URL da imagem
        previewImg.src = imageDataUrl;

        // Exibir a barra de progresso por 10 segundos
        setTimeout(() => {
          loadingBar.style.display = "none";
          loadingText.style.display = "none";
        }, 10000); // 10 segundos
      };

      reader.readAsDataURL(file);
    } else {
      // Se o arquivo for menor ou igual a 100 KB, mostra a imagem diretamente
      const reader = new FileReader();
      reader.onload = function (e) {
        imageDataUrl = e.target.result; // Armazenar o URL da imagem
        previewImg.src = imageDataUrl;
      };
      reader.readAsDataURL(file);
    }
  }
}

const removeBackground = () => {
  if (!imageDataUrl) {
    alert("Por favor, carregue uma imagem primeiro.");
    return;
  }

  const img = new Image();
  img.src = imageDataUrl;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Remover o fundo (por exemplo, tornando a cor branca transparente)
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
        // Detecta cor branca
        data[i + 3] = 0; // Alpha para 0 (transparente)
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const transparentImg = canvas.toDataURL("image/png");
    document.getElementById("previewImg").src = transparentImg;

    // Esconder a barra de carregamento após processar a imagem
    const loadingBar = document.getElementById("loadingBar");
    const loadingText = document.getElementById("loadingText");
    loadingBar.style.display = "none";
    loadingText.style.display = "none";
  };
}
