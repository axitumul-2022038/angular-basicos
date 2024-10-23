
export interface SolicitudOtras{
  id: number,
  idUsuario: number,
  asunto: string,
  descripcion: string,
  fechaSolicitud: Date,
  estadoSolicitudAdmin: string,
  estadoSolicitudUser: string,
  idUsuarioResponsable: number,
  fechaRespuesta: Date
  nombreUsuario?: string;
}