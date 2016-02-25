$(document).ready(function(){	//Cuando la página se ha cargado por completo


	// Ponemos el foco en el primer input
	$(".auto-focus").focus();

	$("form").on("submit", function(){	//Manejador de eventos cuando se intenta enviar el formulario

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


		$.ajax({

			url:"/api/series/",
			data: JSON.stringify({
				title:title,
				url:url
			}),
			dataType:"json",
			contentType: "application/json",
			method:"POST",

			success: function(){
				alert("Guardado con éxito");
			},

			error: function(){
				alert("Se ha producido un error");
			}

		});

		return false;	//Permito el envío del formulario

	});









});