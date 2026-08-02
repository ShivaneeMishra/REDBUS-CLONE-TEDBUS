//export const url:string='https://redbus-clone-tedbus.onrender.com/';
const isLocal = window.location.hostname === 'localhost';
export const url = isLocal ? 'http://localhost:8000/' : 'https://redbus-clone-tedbus.onrender.com/';