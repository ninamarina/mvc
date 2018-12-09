/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },
  borrarTodas: function() {
    this.modelo.borrarTodas();
  },

  editarPregunta: function(id, nuevaPregunta) {
    this.modelo.editarPregunta(id, nuevaPregunta);
  },

  votarRespuesta: function(id, textoRespuesta) {
    this.modelo.votarRespuesta(id, textoRespuesta);
  },

};
