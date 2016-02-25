/*****************************
**** DECLARO FUUNCIONES ******
******************************/

function reloadSeries() {

	console.log("cargando series");

	$.ajax({
		url:"/api/series/",

		success: function(data){
			console.log("Series recuperadas", data);

			var html = "";
			for (var i in data){
				var id = data[i].id;
				var title = data[i].title;
				var url = data[i].url || "";	//Para el problema de undefined ((UTILIZAR)) muy común, es poner el valor por defecto
				html += "<li>"
				html += title;
				if (url.length >0)
					html += "(" + url + ")";
				html += '<button data-serieid= "' + id + '"  >Eliminar</button>';
				html += "</li>";
			}
			$("#seriesList").html(html);
			
		}

	});

}



//Cuando la página se ha cargado por completo
$(document).ready(function(){	

	/******************************************************
	**** STARTS: COSAS QUE DEBEN HACERSE AL PRINCIPIO *****
	*******************************************************/

	//Lo primero cargo las series para que ya haya cargadas las que estaban guardadas en el servidor
	reloadSeries();

	// Ponemos el foco en el primer input
	$(".auto-focus").focus();




	/****************************************************
	**** PROGRAMO TODOS LOS MANEJADORES DE EVENTOS ******
	****************************************************/

	//Manejador de eventos cuando se intenta enviar el formulario
	$("form").on("submit", function(){	

		//validación del título
		var title = $.trim( $("#title").val() );	//trim quita espacios por delante y por detrás
		if (title == ""){
			alert("El título no puede ser vacio");
			return false;	//cancela el evento
		}

		//validación de url
		var url = $.trim( $("#cover_url").val() );
		if (url !="" && false == /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig.test(url)){
			alert("La url de la carátula no es válida");
			return false;

		}

		//validación de categorías
		var selectedCategories = $('input[name="category"]:checked');
		if(selectedCategories.length === 0){
			alert("Selecciona al menos una categoría");
			return false;
		}

		//Petición Ajax que realizo al crear el formulario con un POST enviando información al servidor
		$.ajax({

			method:"POST",
			url:"/api/series/",
			data: JSON.stringify({
				title:title,
				url:url
			}),
			dataType:"json",
			contentType: "application/json",
			

			success: function(){
				reloadSeries();
				alert("Guardado con éxito");
			},

			error: function(){
				alert("Se ha producido un error");
			}

		});

		return false;	//Permito el envío del formulario
	});

	
	//Manejador de eventos para cuando me clickan el boton de recargar series
	$("#reloadSeriesButton").on("click", reloadSeries);


	//MAnejador para cuando clicken en eliminar una serie
	$("#seriesList").on("click", "button", function(){		//Poner manejador de eventos a cosas que apareceran en el futuro

		console.log("ELIMINO SERIE");

		var self = this;
		var id = $(self).data("serieid");

		$.ajax({

			method: "delete",
			url:"/api/series/" + id,
			success: function(){
				$(self).parent().remove();
			}

		});

		
	});
});


//Para llamar a funciones con parametros, cuidado con llamarlas/ejecutarlas
	/*
	function reloadSeries (foo, bar) {
		 // body...  
	}

	$("reloadSeriesButton").click(function(){
		reloadSeries(foo,bar);


	});
	*/