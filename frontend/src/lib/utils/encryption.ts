const X509_PEM_PUBLIC_KEY_HEADER = '-----BEGIN PUBLIC KEY-----';
const X509_PEM_PUBLIC_KEY_FOOTER = '-----END PUBLIC KEY-----';

export const generatePublicKeyPem = (publicKey: string) => {
	return `${X509_PEM_PUBLIC_KEY_HEADER}\n${publicKey}\n${X509_PEM_PUBLIC_KEY_FOOTER}`;
};
