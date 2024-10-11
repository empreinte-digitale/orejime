import {Translations} from '../ui';

export default {
	banner: {
	  title: null,
	  description: "Recopilamos y procesamos su información personal para los siguientes propósitos : {purposes}.\nPara obtener más información, lea nuestra {privacyPolicy}.",
	  privacyPolicyLabel: "política de confidencialidad",
	  accept: "Aceptar",
	  acceptTitle: "Aceptar cookies",
	  decline: "Rechazar",
	  declineTitle: null,
	  configure: "Más información",
	  configureTitle: null
	},
	modal: {
	  title: "La información que recopilamos",
	  description: "Aquí puede ver y personalizar la información que recopilamos sobre usted.\nPara obtener más información, lea nuestra {privacyPolicy}.",
	  privacyPolicyLabel: "política de confidencialidad",
	  close: "Cerrar",
	  closeTitle: null,
	  globalPreferences: "Preferencias para todos los servicios",
	  acceptAll: "Aceptar todas las apps",
	  declineAll: "Rechazar todas las apps",
	  save: "Guardar",
	  saveTitle: "Guardar mi configuración en la información recopilada"
	},
	purpose: {
	  mandatory: "siempre obligatorio",
	  mandatoryTitle: "Esta aplicación es siempre obligatoria",
	  exempt: "desactivar",
	  exemptTitle: "Esta aplicación se carga por defecto (pero puedes desactivarla)",
	  showMore: "Mostrar más",
	  accept: "Aceptar",
	  decline: "Rechazar",
	  enabled: "habilitado",
	  disabled: "deshabilitado",
	  partial: "parcial"
	},
	misc: {
	  newWindowTitle: "nueva ventana",
	  updateNeeded: "Se han producido cambios desde su última visita, actualice su consentimiento.",
	  poweredBy: "Desarrollado por Orejime"
	}
} satisfies Translations;
