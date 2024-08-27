"use strict";

var imageDataUrl = ""; // Armazenar o URL da imagem

var handleFile = function handleFile(event) {
  var file = event.target.files[0];
  var previewImg = document.getElementById("previewImg");
  var loadingBar = document.getElementById("loadingBar");
  var loadingText = document.getElementById("loadingText");

  if (file) {
    if (file.size > 100 * 1024) {
      // Verifica se o arquivo é maior que 100 KB
      loadingBar.style.display = "block";
      loadingText.style.display = "block";
      var reader = new FileReader();

      reader.onload = function (e) {
        imageDataUrl = e.target.result; // Armazenar o URL da imagem

        previewImg.src = imageDataUrl; // Exibir a barra de progresso por 10 segundos

        setTimeout(function () {
          loadingBar.style.display = "none";
          loadingText.style.display = "none";
        }, 10000); // 10 segundos
      };

      reader.readAsDataURL(file);
    } else {
      // Se o arquivo for menor ou igual a 100 KB, mostra a imagem diretamente
      var _reader = new FileReader();

      _reader.onload = function (e) {
        imageDataUrl = e.target.result; // Armazenar o URL da imagem

        previewImg.src = imageDataUrl;
      };

      _reader.readAsDataURL(file);
    }
  }
};

var removeBackground = function removeBackground() {
  if (!imageDataUrl) {
    alert("Por favor, carregue uma imagem primeiro.");
    return;
  }

  var img = new Image();
  img.src = imageDataUrl;

  img.onload = function () {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data; // Remover o fundo (por exemplo, tornando a cor branca transparente)

    for (var i = 0; i < data.length; i += 4) {
      if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
        // Detecta cor branca
        data[i + 3] = 0; // Alpha para 0 (transparente)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    var transparentImg = canvas.toDataURL("image/png");
    document.getElementById("previewImg").src = transparentImg; // Esconder a barra de carregamento após processar a imagem

    var loadingBar = document.getElementById("loadingBar");
    var loadingText = document.getElementById("loadingText");
    loadingBar.style.display = "none";
    loadingText.style.display = "none";
  };
};
//# sourceMappingURL=theme.dev.js.map
