/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem("preguntas")) || [];

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todasBorradas = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.respuestaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    const { preguntas } = this;
    return preguntas.length === 0 ? 0 : preguntas[preguntas.length - 1].id + 1;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    const id = this.obtenerUltimoId();
    const nuevaPregunta = {
      textoPregunta: nombre,
      id: id,
      cantidadPorRespuesta: respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id) {
    const index = this.preguntas.findIndex(preg => preg.id === parseInt(id));
    if (index !== -1) {
      this.preguntas.splice(index, 1);
      this.guardar();
      this.preguntaEliminada.notificar();
    }
  },

  borrarTodas: function() {
    this.preguntas = [];
    this.todasBorradas.notificar();
    this.guardar();
  },

  editarPregunta: function(id, nuevaPregunta) {
    const index = this.preguntas.findIndex(preg => preg.id === parseInt(id));
    if (index !== -1) {
      this.preguntas[index].textoPregunta = nuevaPregunta;
      this.preguntaEditada.notificar();
      this.guardar();
    }
  },

  votarRespuesta: function(id, textoRespuesta) {
    const index = this.preguntas.findIndex(preg => preg.id === parseInt(id));
    if (index !== -1) {
      const respuestas = this.preguntas[index].cantidadPorRespuesta;
      respuestas.forEach(resp => {
        if (resp.textoRespuesta === textoRespuesta) resp.cantidad++;
      });
      this.respuestaVotada.notificar();
      this.guardar();
    }
  },

  //se guardan las preguntas
  guardar: function() {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  }
};
