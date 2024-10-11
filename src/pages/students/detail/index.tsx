import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import SchoolIcon from "@mui/icons-material/School";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import Tabs from "../Component/TabData";
import RelativeModal from "./Modal/RelativeModal";
import SelfModal from "./Modal/SelfModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../redux/store";
import { fetchStudentDetailAction } from "../../../redux/actions/studentAction";
import { IContact, IStudent } from "../../../typing/studentType";
import ModalConfirm from "../../../components/modal/modalComfirm";
const Detail: React.FC = () => {
  // Example data for the carousel

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch<AppDispatch>();
  const student = useSelector(
    (state: IRootState) => state.student.studentDetail
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && student?.id !== Number(id)) {
      dispatch(fetchStudentDetailAction(Number(id)))
        .then((res) => console.log("Dispatch thành công:", res))
        .catch((err) => console.error("Lỗi khi dispatch:", err));
    }
  }, [student, id]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [existingData, setExistingData] = useState<IStudent>();
  const [isSelfModalOpen, setIsSelfModalOpen] = useState(false);
  const [isRelativeModalOpen, setIsRelativeModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [relativeIndex, setRelativeIndex] = useState(0);
  const [contactToDelete, setContactToDelete] = useState<IContact | null>(null);
  const [indexToDelete, setIndexToDelete] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    if (student) {
      setExistingData(student); // Thiết lập dữ liệu học viên khi có thông tin
      setContacts(student.contacts || []); // Thiết lập danh sách liên hệ
    }
  }, [student]);

  const openDeleteConfirmModal = (index: number) => {
    setIndexToDelete(index);
    setShowConfirm(true); // Mở modal xác nhận
  };

  const handleDeleteContact = (index: number) => {
    setContacts(prevContacts => prevContacts.filter((_, i) => i !== index));
    setContactToDelete(student?.contacts[index] || null); // Lấy thông tin liên hệ cần xóa
    setExistingData(student); // Truyền dữ liệu học viên vào existingData
    setShowConfirm(false); // Đóng modal xác nhận
  }

  const openRelativeModal = (title: string, index?: number) => {
    setModalTitle(title);
    setRelativeIndex(index || 0); // Thiết lập index của người liên hệ được chỉnh sửa
    setIsRelativeModalOpen(true); // Mở modal
  };

  const closeRelativeModal = () => {
    setIsRelativeModalOpen(false);
  };

  // Open SelfModal và truyền dữ liệu của học viên
  const openSelfModal = () => {
    setExistingData(student); // Truyền dữ liệu của học viên vào existingData
    setModalTitle("Edit Information");
    setIsSelfModalOpen(true);
  };

  const closeSelfModal = () => {
    setIsSelfModalOpen(false);
  };

  const handleRefresh = () => {
    dispatch(fetchStudentDetailAction(Number(id)))
      .then((res) => console.log("Dispatch thành công:", res))
      .catch((err) => console.error("Lỗi khi dispatch:", err));
  };

  return (
    <div>
      <div className="container flex justify-between space-x-4">
        <div className="detail-container w-1/3 border border-gray-200 rounded shadow-md">
          <div className="flex space-x-8 py-4 px-4">
            <div className="avt w-24 flex justify-center">
              <img
                className="rounded-full"
                src={student?.avatar ? student.avatar : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"}
                alt="student.avatar"
              ></img>
            </div>
            <div className="background-detail text-sm w-3/4 pt-3">
              <div>Họ và tên: {student?.full_name}</div>
              <div className="flex justify-between">
                <div>Ngày sinh: {student?.birthday}</div>
                <div>Giới tính: {student?.sex}</div>
              </div>
              <div>Số điện thoại: {student?.phone}</div>
            </div>
          </div>
          <div className="study-detail flex px-4  space-x-4">
            <div className="flex text-left space-x-4">
              <div className="logo pt-2">
                <SchoolIcon />
              </div>
              <div className="dt">
                <div className="text-center">
                  {student?.courses?.length || 0}
                </div>
                <div>Khóa học tham gia</div>
              </div>
            </div>
            <div className="flex text-left space-x-4">
              <div className="logo pt-2">
                <PaidIcon />
              </div>
              <div className="dt">
                <div className="text-center">
                  {student?.courses.reduce(
                    (acc, courrse) => acc + Number(courrse.total),
                    0
                  )}
                </div>
                <div>Số tiền đã đóng</div>
              </div>
            </div>
          </div>
          <div className="study-detail p-4">
            <div className="study-detail-head flex justify-between w-full border-b border-gray-300">
              <div>Chi tiết học viên</div>
              <button className="edit-button" onClick={openSelfModal}>
                <ModeEditOutlineIcon />
              </button>
            </div>
            <div className="study-detail-body pt-2">
              <div>Mã học viên: {student?.id}</div>
              <div>Mã hồ sơ: {student?.profile_code}</div>
              <div>
                Email: {student?.email ? student?.email : "Không có dữ liệu"}
              </div>
              <div>
                CCCD/CMND:{" "}
                {student?.id_card ? student?.id_card : "Không có dữ liệu"}
              </div>
              <div>
                Ngày cấp:{" "}
                {student?.date_card ? student?.date_card : "Không có dữ liệu"}
              </div>
              <div>
                Địa chỉ liên hệ:{" "}
                {student?.address ? student?.address : "Không có dữ liệu"}
              </div>
            </div>
          </div>
          <div className="relative p-4">
            <div className="relative-head flex justify-between border-b border-gray-300">
              <div>Người liên hệ</div>
              <div>
                <button
                  className="add-button px-1"
                  onClick={() => openRelativeModal("Add Modal")}
                >
                  <AddCircleIcon />
                </button>
              </div>
            </div>
            <Slider {...settings}>
              {contacts.map((contact, index) => (
                <div key={index} className="relative-body pt-2">
                  <div className="flex justify-between">
                    <div className="relative-body-detail">
                      <div>Quan hệ: {contact.type}</div>
                      <div>Họ và tên: {contact.full_name}</div>
                      <div>Số điện thoại: {contact.phone}</div>
                      <div>
                        Email:{" "}
                        {contact.email ? contact.email : "Không có dữ liệu"}
                      </div>
                    </div>
                    <div className="relative-body-delete">
                      <button
                        className="edit-button px-1"
                        onClick={() => openRelativeModal("Edit Modal", index)}
                      >
                        <ModeEditOutlineIcon />
                      </button>
                      <button 
                      className="delete-button"
                      onClick={() => openDeleteConfirmModal(index)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/3 border border-gray-200 rounded">
          <Tabs />
        </div>
      </div>
      <div>
              {/* Modal Xác Nhận */}
      <ModalConfirm
        show={showConfirm}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa liên hệ này?"
        onConfirm={() => handleDeleteContact(indexToDelete)}
        onClose={() => setShowConfirm(false)}
      />
      </div>
      <div>
        <RelativeModal
          isOpen={isRelativeModalOpen}
          onClose={closeRelativeModal}
          title={modalTitle}
          existingData={existingData} // Truyền existingData từ component cha
          contactIndex={relativeIndex}
          onRefresh={handleRefresh}
          deleteContact={contactToDelete}
        />
      </div>
      <div>
        <SelfModal
          isOpen={isSelfModalOpen}
          onClose={closeSelfModal}
          existingData={existingData}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default Detail;
