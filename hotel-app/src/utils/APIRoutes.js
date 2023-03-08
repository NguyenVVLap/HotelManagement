export const host = "http://localhost:8080";
//Login
export const loginRoute = `${host}/api/auth/authenticate`;

//Register
export const registerRoute = `${host}/api/auth/register`;
export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneExist`;

//Booking
export const getRoomsRoute = `${host}/api/rooms`;

//Floor
export const getFloorsRoute = `${host}/api/tang`;
export const addFloorsRoute = `${host}/api/tang`;
export const findFloorRoute = `${host}/api/tang/timKiemTang`;

//Equipment
export const getEquipmentsRoute = `${host}/api/thietbi`;
export const addEquipmentRoute = `${host}/api/thietbi`;
export const findEquipmentRoute = `${host}/api/thietbi/timKiemThietBi`;
