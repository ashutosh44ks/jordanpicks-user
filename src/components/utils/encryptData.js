import JSEncrypt from 'jsencrypt';

function encryptData(data) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(process.env.REACT_APP_PUBLIC_ENCRYPTION_KEY);
  return encryptor.encrypt(data);
}

export default encryptData;
