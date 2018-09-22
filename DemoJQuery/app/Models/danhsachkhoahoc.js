function DanhSachKhoaHoc()
{
    this.MangKhoaHoc = [];
    this.LayThongTinKhoaHoc = function(maKhoaHoc){
        var KhoaHoc = {};
        this.MangKhoaHoc.map(function(khoaHoc, index)
        {
            if(khoaHoc.MaKhoaHoc == maKhoaHoc)
            {
                KhoaHoc = khoaHoc;
            }
        });
        return KhoaHoc;
    }

    this.CapNhatKhoaHoc = function(khoaHoc){
        for(var i=0;i<this.MangKhoaHoc.length;i++)
        {
            var khoaHocCapNhat = this.MangKhoaHoc[i]; //Lấy khóa học trong Mang
            //Kiểm tra xem trùng với ttkhoahoc (tt: MaKhoaHoc) truyền vào không
            if(khoaHocCapNhat.MaKhoaHoc == khoaHoc.MaKhoaHoc) 
            {
                khoaHocCapNhat.MaKhoaHoc = khoaHoc.MaKhoaHoc;
                khoaHocCapNhat.TenKhoaHoc = khoaHoc.TenKhoaHoc; //Cập nhật thông tin người dùng trong mảng
                khoaHocCapNhat.MoTa = khoaHoc.MoTa;
                khoaHocCapNhat.LuotXem = khoaHoc.LuotXem;
                khoaHocCapNhat.Nguoitao = khoaHoc.NguoiTao;
            }
        }
    }
}