export const host = "http://localhost:8080";
//Login
export const loginRoute = `${host}/api/auth/authenticate`;

//Register
export const registerRoute = `${host}/api/auth/register`;
export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneExist`;

//Booking
export const getRoomsOrderRoute = `${host}/api/phong/sapXepTrangThai`;
export const getBookingsRoute = `${host}/api/phieuDatPhong`;
export const getBookingsOrderDateRoute = `${host}/api/phieuDatPhong/orderDate`;
export const getBookingsByCCCD = `${host}/api/phieuDatPhong/searchByCCCD`;
export const addBookingsRoute = `${host}/api/phieuDatPhong/themPhieu`;

//Bill
export const addBillsRoute = `${host}/api/hoaDon`;
export const getBillsOrderDateRoute = `${host}/api/hoaDon/orderDate`;
export const getBillsByCCCD = `${host}/api/hoaDon/searchByCCCD`;

//Floor
export const getFloorsRoute = `${host}/api/tang`;
export const addFloorsRoute = `${host}/api/tang`;
export const findFloorRoute = `${host}/api/tang/timKiemTang`;

//Room
export const getRoomsRoute = `${host}/api/phong`;
export const addRoomRoute = `${host}/api/phong`;
export const deleteRoomRoute = `${host}/api/phong/xoaPhong`;
export const findRoomRoute = `${host}/api/phong/timKiemPhong`;

//RoomType
export const getRoomTypesRoute = `${host}/api/loaiPhong`;
export const addRoomTypeRoute = `${host}/api/loaiPhong`;
export const findRoomTypeRoute = `${host}/api/loaiPhong/timKiemLoaiPhong`;

//Service
export const getAllServiceRoute = `${host}/api/dichvu`;
export const addDichVu = `${host}/api/dichvu`;
export const updateDichVu = `${host}/api/dichvu`;
export const timKiemDichVu = `${host}/api/dichvu/timKiemDichVu`;

//Customer
export const getAllKhachHangRoute = `${host}/api/khachhang`;
export const addKhachHang = `${host}/api/khachhang`;
export const updateKhachHang = `${host}/api/khachhang`;
export const timKiemKhachHang = `${host}/api/khachhang/timKiemKhachHang`;

//Employee
export const addNhanVien = `${host}/api/nhanvien`;
export const getAllNhanVienRoute = `${host}/api/nhanvien`;
export const updateNhanVien = `${host}/api/nhanvien`;
export const timNhanVien = `${host}/api/nhanvien/timKiemNhanVien`;
