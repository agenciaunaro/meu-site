/** Chave do consentimento de cookies salvo no navegador. */
export const KEY = "unaro-consentimento";

/**
 * Consent Mode v2: roda no <head>, antes do GTM.
 * Tudo começa negado; se o visitante já escolheu antes, a escolha salva é aplicada na hora.
 */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=JSON.parse(localStorage.getItem('${KEY}')||'null');if(c){var a=c.analytics?'granted':'denied',m=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:a,ad_storage:m,ad_user_data:m,ad_personalization:m});}}catch(e){}`;
