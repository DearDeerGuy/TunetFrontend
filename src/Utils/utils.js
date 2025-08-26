export const dopPatch = '/Tunet/public';

export const activateImageULR = (url) => {
    let u = new URL(url);
    let newUrl = `${u.origin}${dopPatch}${u.pathname}`;
    return newUrl;
}
