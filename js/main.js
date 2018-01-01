var list = [
	{
		"desc": "rice", 
		"amount": "1",
		"value": "5.40"
	}, 
	{
		"desc": "beer", 
		"amount": "12",
		"value": "1.99"
	}, 
	{
		"desc": "meat", 
		"amount": "1",
		"value": "15.00"
	}

];


function getTotal(list){
	var total = 0 ; 
	for (var key in list){
		total += list[key].value * list[key].amount ; 
	}
	document.getElementById('totalValue').innerHTML = formatValue(total);	
}

function setList(list){

	var table = '<thead>' +
			      '<tr>'+
			        '<th>Description</th>'+
			        '<th>Amount</th>'+
			        '<th>Value</th>'+
			        '<th>Ação</th>'+
			    '  </tr>'+
			    '</thead>'+
			    '<tbody>' ; 
	for(var key in list){
		table += '<tr>' +
			        '<td>'+ formatDesc(list[key].desc) + '</td>' +
			        '<td>'+ formatAmount(list[key].amount) + '</td>' +
			        '<td>'+ formatValue(list[key].value) + '</td>' +
			        '<td> <button class="btn btn-default" onclick="setUpdate('+key+');" >Edit</button> <button class="btn btn-default" onclick="deleteData('+key+');" >Delete</button></td>' +
			      '</tr>' ;
	}
	table+= '</tbody>' ;
	getTotal(list) ;
	document.getElementById('listTable').innerHTML = table ;
}

function formatDesc(desc){

	var str = desc.toLowerCase() ;
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str ; 
}

function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "" ;
	str = str.replace(".", ",") ; 
	str = "$ "+ str ; 
	return str ; 
}

function formatAmount(amount){
	return parseInt(amount) ;
}

function addData(){
	if(!validation()){
		return ;
	}
	var desc = document.getElementById('desc').value ; 
	var value = document.getElementById('value').value ; 
	var amount = document.getElementById('amount').value ;

	list.unshift({"desc":desc , "value":value , "amount":amount});
	setList(list); 
}

function setUpdate(id){
	var obj = list[id] ;
	document.getElementById('desc').value  = obj.desc ; 
	document.getElementById('amount').value  = obj.amount ; 
	document.getElementById('value').value  = obj.value ; 

	document.getElementById('btnUpdate').style.display = "inline-block"; 
	document.getElementById('btnAdd').style.display = "none"; 

	document.getElementById('inputIdUpdate').innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">' ; 
}

function resetForm(){
	
	document.getElementById('desc').value  = ""; 
	document.getElementById('amount').value  = "" ; 
	document.getElementById('value').value  = "" ; 
	document.getElementById('inputIdUpdate').innerHTML = "" ;

	document.getElementById('btnUpdate').style.display = "none"; 
	document.getElementById('btnAdd').style.display = "inline-block"; 
}

function updateData(){
	var id = document.getElementById('idUpdate').value ; 
	var desc = document.getElementById('desc').value ; 
	var amount = document.getElementById('amount').value ; 
	var value = document.getElementById('value').value ; 

	list[id] = {
		'desc': desc, 
		'amount': amount, 
		'value': value  
	}
	resetForm();
	setList(list);
}

function deleteData(id){
	if(confirm('Delet this item ?')){
		if(id === list.length-1){
			list.pop();
		}else if(id == 0){
			list.shift(); 
		}else{
			var arrInicial = list.slice(0, id);
			var arrFinal = list.slice(id+1);
			list = arrInicial.concat(arrFinal) ; 
		}

		setList(list) ;
	}
}

function validation(){
	var desc = document.getElementById('desc').value ;
	var amount = document.getElementById('amount').value ;
	var value = document.getElementById('value').value ;
	var errors = "" ;

	if(desc == ""){
		errors+= "<p>Fill out description</p>" ; 
	}
	if(amount == ""){
		errors+= "<p>Fill out amount</p>" ; 
	}else if(amount != parseInt(amount)){
		errors+= "<p>Fill out a valid amount</p>" ; 
	}
	if(value == ""){
		errors+= "<p>Fill out value</p>" ; 
	}else if(value != parseFloat(value)){
		errors+= "<p>Fill out a valid value</p>" ; 
	}

	if(errors != ""){
		document.getElementById('errors').innerHTML = "<h4>Errors: </h4>"+ errors ;
		document.getElementById('errors').style.display = "block" ;
		document.getElementById('errors').style.backgroundColor = "#ff00006b" ;
		document.getElementById('errors').style.borderRadius = "13px" ;
		document.getElementById('errors').style.padding = "10px" ;
		document.getElementById('errors').style.margin = "10px" ;

		return 0 ;
	}else{
		document.getElementById('errors').style.display = "none" ;
		return 1 ;
	}

}

function deleteList(){
	if(confirm('Delete the entire list ?')){
		list = [] ; 
		setList(list) ;
	}
} 

// console.log(getTotal(list)) ;
setList(list) ; 