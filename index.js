const escolhas = document.getElementById('selecaoPrincipal');
const selecionadoCesar = document.getElementById('entradaCesar')
const InputNumber = document.getElementById('numeroEntradaCesar');
const codificarRadio = document.getElementById('codificar');
const decodificarRadio = document.getElementById('decodificar');
const btnCodificar = document.getElementById('codificarMensagem');
const btnCodificarCesar = document.getElementById('codificarCesar')
const btnDecodificar = document.getElementById('decodificarMensagem');
const btnDecodificar64 = document.getElementById('decodificar64');
const btnVoltar = document.getElementById('voltaTudo');
const paragrafoCodificado = document.getElementById('paragrafoCodificado');
const textoCaixa = document.getElementById('caixa-texto');
const caixaFinal = document.getElementById('caixaResultadoTexto');


//função que mostra uma caixa oculta após seleção de César.
escolhas.addEventListener('click', function(){
  
    if(escolhas.value === 'cesar'){
      selecionadoCesar.style.display = "flex";
    }else{
      selecionadoCesar.style.display = "none";
    }
});


// Caixas adicionando botões  para input\\
codificarRadio.addEventListener('click', function(){
  
    if(codificarRadio.checked && escolhas.value === 'cesar'){
      document.getElementById("caixa-texto").placeholder = "Digite o texto para codificar";
      btnCodificarCesar.style.display = 'flex';
      btnDecodificar.style.display = 'none';
    }
    else if(codificarRadio.checked && escolhas.value === 'base64'){
      document.getElementById("caixa-texto").placeholder = "Digite o texto para codificar";
      btnDecodificar.style.display = 'none';
      btnCodificar.style.display = "flex";
    }

    else{
      caixaFinal.style.display = "none";
    }
});

decodificarRadio.addEventListener('click', function(){
    if(decodificarRadio.checked && escolhas.value === 'base64'){
      btnDecodificar64.style.display = 'flex';
      document.getElementById("caixa-texto").placeholder = "Digite o texto para decodificar";
    }
    else if(decodificarRadio.checked && escolhas.value === 'cesar'){
      document.getElementById("caixa-texto").placeholder = "Digite o texto para decodificar";
      btnDecodificar.style.display = 'flex';
      btnCodificar.style.display = "none";
    }
    else{
      caixaFinal.style.display = "none";
    }
});






//Codificando base 64.

btnCodificar.addEventListener('click',function codando64() {
  if ( escolhas.value ==='base64' && codificarRadio.checked){
    decodificarRadio.disabled = true;
    btnCodificar.style.display = 'none';
    btnVoltar.style.display = 'flex';
    paragrafoCodificado.style.display = 'flex';
    textoCaixa.style.display = 'none';
    caixaFinal.style.display = 'flex';
    caixaFinal.innerHTML = codBase64(textoCaixa.value);
  }else{
    caixaFinal.style.display = 'none';
  }
});

//Decodificando base 64.

btnDecodificar64.addEventListener('click',function codando64() {
  if ( escolhas.value ==='base64' && decodificarRadio.checked){
    codificarRadio.disabled = true;
    btnDecodificar64.style.display = 'none';
    btnVoltar.style.display = 'flex';
    paragrafoCodificado.style.display = 'flex';
    textoCaixa.style.display = 'none';
    caixaFinal.style.display = 'flex';
    caixaFinal.innerHTML = decodBase64(textoCaixa.value);
  }else{
    caixaFinal.style.display = 'none';
  }
  return true;
});

// Cifra de César
// Aceitando apenas letras para codificação em César.

btnCodificarCesar.addEventListener('click',function codandoCesar() {
  var filtraEntrada = /^([a-zA-Z]|\s+)+$/;
  if (!filtraEntrada.test(document.getElementById("caixa-texto").value)) {
    textoCaixa.placeholder = "Digite apenas letras sem acentos!";
    textoCaixa.value = '';
    textoCaixa.style.borderColor = "#ff0000";
    textoCaixa.style.outline = "#ff0000";
    textoCaixa.focus();
    textoCaixa.onkeydown = function keydown_nome() {
          textoCaixa.placeholder = "";
          textoCaixa.style.outline = null;
      }
      return false;
  } 
  else if ( escolhas.value === 'cesar' && codificarRadio.checked ){
    decodificarRadio.disabled = true;
    btnCodificarCesar.style.display = 'none';
    btnVoltar.style.display = 'flex';
    paragrafoCodificado.style.display = 'flex';
    textoCaixa.style.display = 'none';
    caixaFinal.style.display = 'flex';
    caixaFinal.innerHTML = codifica(textoCaixa.value, Number(InputNumber.value));
  }else{
    caixaFinal.style.display = 'none';
  }
  return true;
});


//Decodificando César.
btnDecodificar.addEventListener('click',function descodandoCesar() {
  var filtraEntrada = /^([a-zA-Z]|\s+)+$/;
  if (!filtraEntrada.test(document.getElementById("caixa-texto").value)) {
      textoCaixa.value = '';
      textoCaixa.placeholder = "Digite apenas letras, sem acento!";
      textoCaixa.style.borderColor = "#ff0000";
      textoCaixa.style.outline = "#ff0000";
      textoCaixa.focus();
      textoCaixa.onkeydown = function keydown_nome() {
        textoCaixa.placeholder = "";
        textoCaixa.style.outline = null;
      }
      return false;
  }else if ( escolhas.value === 'cesar' && decodificarRadio.checked ){
    codificarRadio.disabled = true;
    btnDecodificar.style.display = 'none';
    btnVoltar.style.display = 'flex';
    paragrafoCodificado.style.display = 'flex';
    textoCaixa.style.display = 'none';
    caixaFinal.style.display = 'flex';
    caixaFinal.innerHTML = decodificaCesar(textoCaixa.value, Number(InputNumber.value));
  } else{
    caixaFinal.style.display = 'none';
  }
  return true;
});



// ********************************************* \\
 

// função que codifica em Cesar;

const codifica = (texto, incremento) => {

    let codificado = "", code;
    for (let i = 0; i < texto.length; i++) {
      if (texto.charCodeAt(i) >= 65 && texto.charCodeAt(i) <= 90) {
        code = (((texto.charCodeAt(i) - 65) + incremento) % 26) + 65;
      }
      else if (texto.charCodeAt(i) >= 97 && texto.charCodeAt(i) <= 122) {
        code = (((texto.charCodeAt(i) - 97) + incremento) % 26) + 97;
      }
      else if (texto.charCodeAt(i) === 32) {
        code = 32;
      }
      codificado += String.fromCharCode(code);
    }
    return codificado.toLowerCase();
}

// Função que decodifica;
const decodificaCesar = (texto, incremento) => {

  let decodificado = "", decode;
  for (let i = 0; i < texto.length; i++) {
    if (texto.charCodeAt(i) >= 65 && texto.charCodeAt(i) <= 90) {
      decode = (((texto.charCodeAt(i) - 90) - incremento) % 26) + 90;
    }
    else if (texto.charCodeAt(i) >= 97 && texto.charCodeAt(i) <= 122) {
      decode = (((texto.charCodeAt(i) - 122) - incremento) % 26) + 122;
    }
    else if (texto.charCodeAt(i) === 32) {
      decode = 32;
    }

    decodificado += String.fromCharCode(decode);
  }
  return decodificado.toLowerCase();
}
  


  // codificando na base 64;

  function codBase64(texto) {
    return btoa(texto);
  }
  
  //decodificando base64;
  function decodBase64(texto) {
    return atob(texto);
  }