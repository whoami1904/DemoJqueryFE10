$(document).ready(function(){
    var dsKhoaHoc = new DanhSachKhoaHoc(); //tạo ra mảng khóa học
    var svKhoaHoc = new KhoaHocService(); 
    var svNguoiDung = new NguoiDungService();
    
    //Gọi phương thức từ khoahocservice.js thông qua api đã cài đặt lấy dữ liệu
    //Do ajax chạy cơ chế bất đồng bộ
    svKhoaHoc.LayDanhSachKhoaHoc().done(function(data){
        dsKhoaHoc.MangKhoaHoc = data; //gán data là dsKhoaHoc trong MangKhoaHoc để data quản lý không phải truy vấn api để load về local lại
        LoadDanhSachKhoaHoc(data);
    }).fail(function(error){

    });

    function LoadDanhSachKhoaHoc(MangKhoaHoc)
    {
        var noiDungTable = ``;

        MangKhoaHoc.map(function(khoahoc,index){ //index: vị trí phần tử trong mảng - khoahoc: là đối tượng trong mảng
            var moTa = khoahoc.MoTa;
            if(moTa != null)
            {
                /*
                    BieuThucDieuKien 
                    ?: Đúng thực hiện biểu thức 1 (trước dấu :)
                    : sai thực hiện biểu thức 2 (sau dấu :)
                */
                moTa.length >= 50 ? moTa = khoahoc.MoTa.substring(0,50) : moTa = khoahoc.MoTa;
            }
            // console.log(khoahoc);
            noiDungTable += `
                <tr>
                    <td></td>
                    <td>${khoahoc.MaKhoaHoc}</td>
                    <td>${khoahoc.TenKhoaHoc}</td>
                    <td>${moTa}...</td>
                    <td><img src='${khoahoc.HinhAnh}' width="75" height="50"></img></td>
                    <td>${Number(khoahoc.LuotXem).toLocaleString()}</td>
                    <td>${khoahoc.NguoiTao}</td>
                    <td>
                        <button makhoahoc="${khoahoc.MaKhoaHoc}"  class="btnSuaKhoaHoc btn btn-primary">Chỉnh sửa</button>
                    </td>
                </tr>
            `;
        })
        $("#tblDanhSachKhoaHoc").html(noiDungTable);
    }

    //Sửa khóa học
    $("body").delegate(".btnSuaKhoaHoc", "click", function(){
        $("#btnModal").trigger("click");
        $(".modal-title").html("Cập nhật khóa học");
        var modalFooter = `
            <button class="btn btn-success" id="btnLuu">Lưu</button>
            <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
        `;
        $(".modal-footer").html(modalFooter);
        //Load thông tin khóa học lên popup
        //Lấy mã khóa học từ attribute của nút được click
        var maKhoaHoc = $(this).attr("makhoahoc");
        var khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(maKhoaHoc);
        // console.log(khoaHoc);
        if(khoaHoc != null)
        {
            //DOM đến các thẻ input để load thông tin khóa học
            $("#MaKhoaHoc").val(khoaHoc.MaKhoaHoc);
            $("#TenKhoaHoc").val(khoaHoc.TenKhoaHoc);
            $("#MoTa").val(khoaHoc.MoTa);
            $("#LuotXem").val(khoaHoc.LuotXem);
            $("#NguoiTao").val(khoaHoc.NguoiTao);
        }
    });

    $("body").delegate("#btnLuu", "click", function(){
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        khoaHoc.MoTa = $("MoTa").val();
        khoaHoc.LuotXem = $("LuotXem").val();
        khoaHoc.MguoiTao = $("NguoiTao").val();

        //Gọi service post dữ liệu khóa học lên server
        console.log(khoaHoc)
        svKhoaHoc.CapNhatKhoaHoc(khoaHoc).done(function(ketqua){
            if(ketqua)
            {
                // console.log(ketqua);
                location.reload(); //Cập nhật thành công refresh lại trang
            }
        }).fail(function(loi){
            console.log(loi);
        })
    })

    //Thêm khóa học
    $("#btnThemKhoaHoc").click(function(){
        $("#btnModal").trigger('click');
        $('.modal-title').html('Thêm Khóa học');
        var modalFooter = `
            <button class="btn btn-success" id="btnLuu">Thêm Khóa học</button>
            <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
        `
        $('.modal-footer').html(modalFooter);
        //Clear dữ liệu input
        $('.modal-body input').val('');
    })
   

    $("body").delegate("#btnThem", "click",  function(){
       var khoaHoc = new KhoaHoc();
       khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
       khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
       khoaHoc.MoTa = $("#MoTa").val();
       khoaHoc.LuotXem = $("#LuotXem").val();
       khoaHoc.NguoiTao = $("#NguoiTao").val();

    //    console.log(khoaHoc);

       //Gọi service POST dữ liệu khóa học lên Server
       svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function(ketqua){
           if(ketqua)
           {
                location.reload(); // thêm thành công refresh lại trang
                // console.log(ketqua);
           }
       }).fail(function(loi){
           console.log(loi);
       })
    })

    //Load nội dung cho thẻ select người tạo
    svNguoiDung.LayDanhSachNguoiDung().done(function(MangNguoiDung){
        //Gọi hàm load nội dung cho thẻ select
        LoadSelectNguoiDung(MangNguoiDung);
    }).fail(function(){

    });

    function LoadSelectNguoiDung(MangNguoiDung){
        var noiDungSelect = "";
        MangNguoiDung.map(function(nd,index){
            if(nd.MaLoaiNguoiDung == "GV")
            {
                noiDungSelect += `
                    <option value="${nd.TaiKhoan}">${nd.HoTen}</option>
                `
            }
        });
        $("#NguoiTao").html(noiDungSelect);    
    }
})
