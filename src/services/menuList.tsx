import axios from "axios";



export const fetchMenuListService = async () => {
    try {

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Token không tồn tại");
        }


    const res = await axios.get("https://api-dev.seoulacademy.edu.vn/api/menu/list", {
        headers: {
            //bearer là kiểu token dùng để xác thực quyền truy cập
            'token' : token,
        },
    });
    const menuList = res.data;
    console.log("API Response:", menuList); // Log để kiểm tra API trả về
    
    localStorage.setItem("menuList", JSON.stringify(menuList)); 
      console.log("Menu List:", menuList); // Log để kiểm tra menu list
    return menuList;  
        } catch (error) {
          console.log("Lỗi fetch menu list:", error);
          return [];
        }
  }
  // Hàm lấy menu list từ local storage
