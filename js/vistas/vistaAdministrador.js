/*
 * Vista administrador
 */
const VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(this.reconstruirLista.bind(this));
  this.modelo.preguntaEliminada.suscribir(this.reconstruirLista.bind(this));
  this.modelo.todasBorradas.suscribir(this.reconstruirLista.bind(this));
  this.modelo.preguntaEditada.suscribir(this.reconstruirLista.bind(this));
  this.modelo.respuestaVotada.suscribir(this.reconstruirLista.bind(this));
};

VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta) {
    let nuevoItem;
    nuevoItem = $("<li></li>");
    nuevoItem.addClass("list-group-item");
    nuevoItem.attr({ id: pregunta.id });
    nuevoItem.html(pregunta.textoPregunta);
    let interiorItem = $(".d-flex");
    let titulo = interiorItem.find("h5");
    titulo.text(pregunta.textoPregunta);
    interiorItem.find("small").text(
      pregunta.cantidadPorRespuesta.map(function(resp) {
        return " " + resp.textoRespuesta;
      })
    );
    nuevoItem.html($(".d-flex").html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html("");
    const preguntas = this.modelo.preguntas;
    for (let i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function() {
    const { elementos } = this;
    const contexto = this;

    //asociacion de eventos a boton
    elementos.botonAgregarPregunta.click(function() {
      const value = elementos.pregunta.val();
      if (!value) return;
      const respuestas = [];

      $('.form-group:not(.hide) [name="option[]"]').each(function() {
        if (!!$(this).val()) { // solo pusheo respuestas no vacias
          const respuesta = {
            textoRespuesta: $(this).val(),
            cantidad: 0,
          };
          respuestas.push(respuesta);
        }
      });
      if (respuestas.length === 0) return;
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    elementos.botonBorrarPregunta.click(function() {
      const id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });
    elementos.borrarTodo.click(function() {
      contexto.controlador.borrarTodas();
    });
    elementos.botonEditarPregunta.click(function() {
      const id = parseInt($('.list-group-item.active').attr('id'));
      const nuevaPregunta = prompt("Texto para la pregunta:");
      contexto.controlador.editarPregunta(id, nuevaPregunta);
    });
  },

  limpiarFormulario: function() {
    $(".form-group.answer.has-feedback.has-success").remove();
  }
};
