import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { IContact, IPayloadSaveStudent } from "../../../../typing/studentType";
import { saveStudentAction } from "../../../../redux/actions/studentAction";

interface RelativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  existingData?: any; // Truyền existingData từ component cha
  contactIndex?: number; // Index của liên hệ đang chỉnh sửa
  onRefresh: () => void;
  deleteContact?: any;
}

const RelativeModal: React.FC<RelativeModalProps> = ({
  isOpen,
  onClose,
  title,
  existingData,
  contactIndex,
  onRefresh,
  deleteContact,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = existingData?.contacts || [];

  // Sử dụng interface IContact cho formData
  const [formData, setFormData] = useState<IContact>({
    id: 0,
    full_name: "",
    type: "",
    phone: "",
    email: "",
  });

  // Khi modal mở, nếu là chỉnh sửa thì load dữ liệu liên hệ để đổ vào form
  useEffect(() => {
    if (title === "Edit Modal" && contactIndex !== undefined) {
      const contact = contacts[contactIndex];
      setFormData({
        id: contact.id || 0,
        full_name: contact.full_name || "",
        type: contact.type || "",
        phone: contact.phone || "",
        email: contact.email || "",
      });
    } else if (title === "Add Modal") {
      // Trường hợp thêm mới liên hệ thì reset formData về giá trị mặc định
      setFormData({ id: 0, full_name: "", type: "", phone: "", email: "" });
    }
  }, [isOpen, contactIndex, contacts, title]);

  // Xử lý khi người dùng thay đổi input trong form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (deleteContact) {
      handleDelete(deleteContact?.id);
    }
  }, [deleteContact]);

  const handleDelete = async (id: number) => {
    const updatedContacts = {
      delete: [id],
      insert: [],
      update: [],
    };

    // Tạo payload để lưu thông tin sinh viên kèm liên hệ
    const dataToSave: IPayloadSaveStudent = {
      info: {
        id: existingData?.id,
        profile_code: existingData?.profile_code,
        full_name: existingData?.full_name,
        sex: existingData?.sex,
        phone: existingData?.phone,
        avatar: existingData?.avatar,
        birthday: existingData?.birthday,
        email: existingData?.email,
        id_card: existingData?.id_card,
        date_card: existingData?.date_card,
        issued_card_id: existingData?.issued_card_id,
        note: existingData?.note,
        province_id: existingData?.province_id,
        district_id: existingData?.district_id,
        ward_id: existingData?.ward_id,
        address: existingData?.address,
      },
      contacts: updatedContacts, // Cập nhật danh sách liên hệ
      courses: existingData?.courses || [],
      media: existingData?.media || [],
    };
    console.log("exis:", existingData);
    // Log dữ liệu trước khi gọi action
    console.log("dataToSave:", dataToSave);

    // Gọi action lưu thông tin sinh viên
    const result = await dispatch(saveStudentAction(dataToSave));
    if (result.meta.requestStatus === "fulfilled") {
      onRefresh && onRefresh();
      onClose(); // Đóng modal sau khi lưu thành công
    }
  };

  // Lưu thông tin liên hệ khi người dùng nhấn nút "Lưu"
  const handleSubmit = async () => {
    let updatedContacts;

    if (formData.id === 0) {
      // Nếu là liên hệ mới, chỉ truyền thông tin liên hệ mới
      updatedContacts = {
        delete: [],
        insert: [{
          email: formData.email,
          full_name: formData.full_name,
          phone: formData.phone,
          type: formData.type,
        }],
        update: [],
      };
    } else {
      // Nếu là cập nhật liên hệ hiện có
      updatedContacts = {
        delete: [],
        insert: [],
        update: [...contacts], // Giữ nguyên danh sách contacts hiện có
      };

      // Cập nhật liên hệ tại vị trí contactIndex
      if (contactIndex !== undefined) {
        updatedContacts.update[contactIndex] = formData;
      }
    }

    // Tạo payload để lưu thông tin sinh viên kèm liên hệ
    const dataToSave: IPayloadSaveStudent = {
      info: {
        id: existingData?.id,
        profile_code: existingData?.profile_code,
        full_name: existingData?.full_name,
        sex: existingData?.sex,
        phone: existingData?.phone,
        avatar: existingData?.avatar,
        birthday: existingData?.birthday,
        email: existingData?.email,
        id_card: existingData?.id_card,
        date_card: existingData?.date_card,
        issued_card_id: existingData?.issued_card_id,
        note: existingData?.note,
        province_id: existingData?.province_id,
        district_id: existingData?.district_id,
        ward_id: existingData?.ward_id,
        address: existingData?.address,
      },
      contacts: updatedContacts, // Cập nhật danh sách liên hệ
      courses: existingData?.courses || [],
      media: existingData?.media || [],
    };
    console.log("exis:", existingData);
    // Log dữ liệu trước khi gọi action
    console.log("dataToSave:", dataToSave);

    // Gọi action lưu thông tin sinh viên
    const result = await dispatch(saveStudentAction(dataToSave));
    if (result.meta.requestStatus === "fulfilled") {
      onRefresh && onRefresh();
      onClose(); // Đóng modal sau khi lưu thành công
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg flex-grow text-center">{title}</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">
            &times;
          </button>
        </div>

        {/* Form nhập liệu */}
        <div className="space-y-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Quan hệ</option>
            <option value="dad">Cha</option>
            <option value="mom">Mẹ</option>
          </select>

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Họ tên *"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại *"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email (không bắt buộc)"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Nút Lưu và Đóng */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Đóng
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-violet-500 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelativeModal;
