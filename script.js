function pesquisar() {
    var entrada = document.getElementById('entrada').value;
    if (entrada != "" && entrada != undefined && entrada != null) {
        var resultado = [];
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=c809a28af95f88d15ce7f0c522feae91&language=pt-BR&query=' + entrada + '&include_adult=false')
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status = 200) {
                    resultado = JSON.parse(xhr.response);
                    console.log(resultado)
                    document.getElementById('principal').style.display = "none";
                    document.getElementById('pesquisa').style.display = "block";
                    if (resultado.results.length > 0) {
                        document.getElementById('nenhumResultado').style.display = "none";
                        document.getElementById('resultados').style.display = "block";
                        document.getElementById('resultados').innerHTML = "<b>Resultados da pesquisa</b>";
                        resultado.results.forEach(filme => {
                            var elem = document.createElement('div');
                            filme.overview!=null && filme.overview!=""?null:filme.overview = "Não possui descrição disponível"
                            elem.setAttribute("style", "width:100%;float: left;margin-top:50px;margin-left:10px;cursor:pointer");
                            elem.innerHTML = '<span onclick="buscarLink(' + filme.id + ')">  <img class="imagempesquisa" src="http://image.tmdb.org/t/p/w500/' + filme.poster_path + '">  <span style="font-size: large;" class="tituloPagina"><b>Filme: </b>' + filme.title + '</span><span style="font-size: large;" class="subtitulo"><b>Descrição: </b>' + filme.overview + '</span></span>';
                            document.getElementById('resultados').append(elem);
                        });
                    } else {
                        document.getElementById('nenhumResultado').style.display = "block";
                        document.getElementById('resultados').style.display = "none";
                    }
                }
            }
        }
        xhr.send();

    } else {

    }
}


function buscarLink(id) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/'+id+'/watch/providers?api_key=c809a28af95f88d15ce7f0c522feae91')
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status = 200) {
                var resultado = JSON.parse(xhr.response);
                window.open(resultado.results.US.link, '_blank');
            }
        }
    }
    xhr.send();
}