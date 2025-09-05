export const dopPatch = '/Tunet/public';

export const activateImageULR = (url) => {
    if (!url) return null;
    
    try {
        let u = new URL(url);
        let newUrl = `${u.origin}${dopPatch}${u.pathname}`;
        return newUrl;
    } catch (e) {
        return `http://localhost/${dopPatch}/${url}`;
    }
}

export const testSleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}