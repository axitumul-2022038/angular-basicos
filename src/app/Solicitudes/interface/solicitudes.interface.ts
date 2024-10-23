
export interface SolicitudAd{
  id: number;
  idusuario: number;
  solicitudAdmin: boolean;
  estadoSolicitud: String;
  fechaSolicitud: Date;
  fechaSolicitudDia: Date;
  nombreUsuario?: string;
}