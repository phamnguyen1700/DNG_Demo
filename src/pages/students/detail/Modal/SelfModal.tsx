import React, { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import {
  IFileUpload,
  IPayloadSaveStudent,
  IStudent,
} from "../../../..//typing/studentType";
import { AppDispatch, IRootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../../../../components/modal/modalComfirm";
import {
  saveStudentAction,
  uploadFileAction,
} from "../../../../redux/actions/studentAction";
import { fetchProvinceAction } from "../../../../redux/actions/provinceAction";
import { fetchDistrictAction } from "../../../../redux/actions/districtAction";
import { fetchWardAction } from "../../../../redux/actions/wardAction";
import { toast } from "react-toastify";

interface SelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingData?: any;
  onRefresh: () => void;
}

const SelfModal: React.FC<SelfModalProps> = ({
  isOpen,
  onClose,
  existingData,
  onRefresh,
}) => {
  const defaultData: IPayloadSaveStudent = {
    info: {
      id: existingData?.id || 0,
      profile_code: existingData?.profile_code || "",
      full_name: existingData?.full_name || "",
      sex: existingData?.sex || "",
      phone: existingData?.phone || "",
      avatar: existingData?.avatar || "",
      birthday: existingData?.birthday || "",
      email: existingData?.email || "",
      id_card: existingData?.id_card || "",
      date_card: existingData?.date_card || "",
      issued_card_id: existingData?.issued_card_id || 1,
      note: existingData?.note || "",
      province_id: existingData?.province_id || 0,
      district_id: existingData?.district_id || 0,
      ward_id: existingData?.ward_id || 0,
      address: existingData?.address || "",
    },
    contacts: existingData?.contacts || [],
    courses: existingData?.courses || [],
    media: existingData?.media || [],
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const provinces = useSelector(
    (state: IRootState) => state.province.provinceList
  );
  const districts = useSelector((state: IRootState) => state.district.data);
  const wards = useSelector((state: IRootState) => state.ward.data);
  const [formData, setFormData] = useState(defaultData);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      if (existingData) {
        setFormData({
          ...defaultData,
          info: {
            ...defaultData.info,
            ...existingData.info, // Kết hợp thông tin từ existingData vào info
          },
          contacts: existingData.contacts || [],
          courses: existingData.courses || [],
          media: existingData.media || [],
        });
      } else {
        setFormData(defaultData);
      }
      if (provinces.length === 0) {
        dispatch(fetchProvinceAction());
      }
    }
  }, [isOpen, existingData, provinces.length]);
  console.log("formData:", formData); // Kiểm tra formData khi thay đổi

  useEffect(() => {
    if (formData.info.province_id) {
      dispatch(fetchDistrictAction(formData.info.province_id)); // Đảm bảo dispatch được gọi
    }
  }, [formData.info.province_id]);

  useEffect(() => {
    if (formData.info.district_id) {
      dispatch(fetchWardAction(formData.info.district_id));
    }
  }, [formData.info.district_id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "full_name") {
      const trimmedValue = value.trim();
      const regex2 =
        /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
      if (!regex2.test(trimmedValue)) {
        setNameError("Họ tên không hợp lệ, viết hoa chữ cái đầu tiên");
      } else {
        setNameError("");
      }
    }

    if (name === "id_card") {
      const regex = /^(?:\d{9}|\d{12}|0)$/;

      // Kiểm tra ngay khi người dùng nhập số CMND/CCCD
      if (!regex.test(value)) {
        setError("CMND/CCCD phải là số có 9 hoặc 12 chữ số.");
      } else {
        setError(""); // Xóa lỗi nếu hợp lệ
      }
    }
    if (name === "province_id") {
      setFormData((prevData) => ({
        ...prevData,
        info: {
          ...prevData.info,
          province_id: parseInt(value),
          district_id: 0,
          ward_id: 0,
        },
      }));
    } else if (name === "district_id") {
      setFormData((prevData) => ({
        ...prevData,
        info: {
          ...prevData.info,
          district_id: parseInt(value),
          ward_id: 0,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        info: {
          ...prevData.info,
          [name]: value,
        },
      }));
    }
  };

  const handleConfirm = async (data: IPayloadSaveStudent) => {
    const dataToSave: IPayloadSaveStudent = { ...data };
    if (existingData?.id) dataToSave.info.id = existingData.id;
    let isValid = true;
    if (!dataToSave.info.birthday) {
      setError("Ngày sinh là bắt buộc");
      isValid = false;
    } else if (!dataToSave.info.sex) {
      setError("Giới tính là bắt buộc");
      isValid = false;
    }

    if (!isValid) {
      setShowConfirm(false);
      return;
    }

    const trimmedName = formData.info.full_name.trim();
    const nameRegex =
      /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
  
    if (!nameRegex.test(trimmedName)) {
      setNameError("Họ tên không hợp lệ, viết hoa chữ cái đầu tiên");
      isValid = false; // Đặt cờ isValid thành false nếu lỗi
    } else {
      setNameError("");
    }

    const regex = /^(?:\d{9}|\d{12}|0)?$/;

    if (!regex.test(dataToSave.info.id_card || "")) {
      setError("CMND/CCCD phải là 9 hoặc 12 chữ số");
      setShowConfirm(false);
      return; // Nếu không hợp lệ, dừng quá trình và không submit
    }
    // Xóa thông báo lỗi nếu hợp lệ
    setError("");

    console.log("Data to save before submit:", dataToSave); // Kiểm tra giá trị trước khi gửi

    // Thực hiện gửi dữ liệu nếu hợp lệ
    const result = await dispatch(saveStudentAction(dataToSave));
    if (result.meta.requestStatus === "fulfilled") {
      setShowConfirm(false);
      onRefresh && onRefresh();
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData(defaultData);
    onClose();
  };

  const handleFileChangeAndUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // Danh sách các loại file hợp lệ
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];

      // Kiểm tra loại file
      if (!validTypes.includes(file.type)) {
        console.error(
          "File không hợp lệ. Chỉ chấp nhận các định dạng PNG, JPG, JPEG."
        );
        toast.error(
          "File không hợp lệ. Chỉ chấp nhận các định dạng PNG, JPG, JPEG."
        );
        return;
      }

      const fileData: IFileUpload = {
        file: file,
        type: "images",
        folder: "avatar",
        resizelevel: 1,
      };

      const resultAction = await dispatch(uploadFileAction(fileData));

      if (resultAction.meta.requestStatus === "fulfilled") {
        const urlArray = resultAction.payload;
        const url = urlArray[0];
        console.log("Uploaded URL:", url);
        setFileUrl(url);
        setFormData((prevData) => ({
          ...prevData,
          info: {
            ...prevData.info,
            avatar: url,
          },
        }));
        console.log("Updated formData:", formData);
      } else {
        console.error("Upload file failed:", resultAction.payload);
      }
    }
  };

  const handleRemoveAvatar = () => {
    setFileUrl("");
    setFormData((prevData) => ({
      ...prevData,
      info: {
        ...prevData.info,
        avatar: "", // Đặt thành null nếu muốn xóa
      },
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-1300">
      <div className="container bg-white rounded-lg w-full max-w-4xl p-4 max-h-[90vh] overflow-y-auto h-3/4">
        <div className="flex justify-between items-center border-b border-gray-3  00 mb-4 px-1">
          <div className="flex-grow">
            <div className="flex justify-center font-bold text-violet-800">
              Cập nhật thông tin
            </div>
            <div className="flex justify-center font-thin text-gray-500 text-xs">
              Số điện thoại sẽ được lấy từ SaleCare nếu có
            </div>
          </div>
          <button onClick={handleCancel} className="text-gray-600 text-xl">
            &times;
          </button>
        </div>

        {/* Basic Information */}
        <div className="text-sm pt-2 pb-1 px-2">Thông tin cơ bản</div>
        <div className="flex px-2">
          <div className="w-1/4 flex justify-center items-center">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChangeAndUpload}
              style={{ display: "none" }}
              id="file-upload"
            />
            {formData.info.avatar ? (
              <div className="relative flex flex-col items-center">
                <img
                  src={formData.info.avatar}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  onClick={handleRemoveAvatar}
                  className="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
                >
                  &times;
                </button>
              </div>
            ) : (
              <label
                htmlFor="file-upload"
                className="grid justify-items-center border border-dashed border-gray-800 rounded py-12 px-10 cursor-pointer"
              >
                <CloudUploadOutlinedIcon />
                <div className="text-sm">Nhấn để tải ảnh lên</div>
              </label>
            )}
          </div>
          <div className="pl-2 w-3/4 grid grid-cols-6 gap-2">
            <div className="col-span-3 ">
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full text-gray-900 border border-gray-300 rounded-md p-2 
             focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600
             disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                placeholder="Số điện thoại"
                name="phone"
                value={formData.info.phone}
                onChange={handleChange}
                disabled={true}
              />
            </div>
            <div className="col-span-3">
              <label className="text-sm font-medium text-gray-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
                placeholder="Họ và tên"
                name="full_name"
                value={formData.info.full_name}
                onChange={handleChange}
                required
              />
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>
            <div className="col-span-3">
              <label className="text-sm font-medium text-gray-700">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
                name="birthday"
                placeholder="Ngày sinh"
                value={formData.info.birthday}
                onChange={handleChange}
                required
              />
              {!formData.info.birthday && (
                <p className="text-red-500 text-xs mt-1">
                  Ngày sinh là bắt buộc.
                </p>
              )}
            </div>
            <div className="col-span-3">
              <label className="text-sm font-medium text-gray-700">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
                name="sex"
                value={formData.info.sex}
                onChange={handleChange}
                required
              >
                <option value="">Giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
              {!formData.info.sex && (
                <p className="text-red-500 text-xs mt-1">
                  Giới tính là bắt buộc.
                </p>
              )}
            </div>
            <div className="col-span-6">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
                placeholder="Email"
                name="email"
                value={formData.info.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* CCCD/CMND */}
        {/* <div className="text-sm pt-2 pb-1 px-2">CMND/CCCD</div> */}
        <div className="w-full grid grid-cols-8 gap-2 p-2">
          <div className="col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Số CMND/CCCD
            </label>
            <input
              type="text"
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              placeholder="CCCD/CMND"
              name="id_card"
              value={formData.info.id_card}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Ngày cấp
            </label>
            <input
              type="date"
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              placeholder="Ngày cấp"
              name="date_card"
              value={formData.info.date_card}
              onChange={handleChange}
              disabled={!formData.info.id_card}
            />
          </div>
          <div className="col-span-3">
            <label className="text-sm font-medium text-gray-700">Nơi cấp</label>
            <select
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              name="issued_card_id"
              onChange={handleChange}
              value={formData.info.issued_card_id || 0}
              disabled={!formData.info.date_card}
            >
              <option value={0}>Chọn nơi cấp</option>
              <option value={1}>
                CCS quản lý hành chính về trật tự xã hội
              </option>
              <option value={2}>
                CCS đăng ký quản lý cư trú dữ liệu quốc gia về dân cư
              </option>
            </select>
          </div>
        </div>

        {/* Address Information */}
        {/* <div className="text-sm pt-2 pb-1 px-2">Địa chỉ liên hệ</div> */}
        <div className="w-full grid grid-cols-6 gap-3 p-2 mb-4 border-b border-gray-300">
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Tỉnh/Thành phố
            </label>
            <select
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              name="province_id"
              onChange={handleChange}
              value={formData.info.province_id || 0}
            >
              <option value={0}>Chọn Tỉnh/Thành phố</option>
              {provinces?.map((province, index) => (
                <option key={index} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Quận/Huyện
            </label>
            <select
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              name="district_id"
              onChange={handleChange}
              value={formData.info.district_id || 0}
              disabled={formData.info.province_id === 0}
            >
              <option value={0}>Chọn Quận/Huyện</option>
              {districts?.map((district, index) => (
                <option key={index} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Phường/Xã
            </label>
            <select
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              name="ward_id"
              onChange={handleChange}
              value={formData.info.ward_id || 0}
              disabled={formData.info.district_id === 0}
            >
              <option value={0}>Chọn Phường/Xã</option>
              {wards?.map((ward, index) => (
                <option key={index} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6">
            <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              type="text"
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              placeholder="Địa chỉ cụ thể"
              name="address"
              value={formData.info.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-6">
            <label className="text-sm font-medium text-gray-700">Ghi chú</label>
            <textarea
              className="w-full text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 p-2"
              placeholder="Ghi chú"
              rows={5}
              name="note"
              value={formData.info.note}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 rounded-md mr-2"
          >
            Đóng
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 bg-violet-800 text-white rounded-md"
          >
            Cập nhật
          </button>
        </div>
      </div>
      <ModalConfirm
        show={showConfirm}
        title="Xác nhận"
        message={`Bạn có chắc chắn muốn ${existingData ? "cập nhật" : "tạo mới"} chương trình này?`}
        onConfirm={() => handleConfirm(formData)}
        onClose={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default SelfModal;
