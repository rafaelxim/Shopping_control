// Função de configuração
function setConfig(){

	//seta um objeto
	var texts = {
		"title": "Shopping Control", 
	}; 

	//seta o titulo do documento com o atributo title do objeto de cima
	document.title = texts.title ; 
	document.getElementById('navTitle').innerHTML = texts.title ;  
}

setConfig() ;