import { computed } from "vue";
import router from "@/services/router";
import { useStorage } from "@vueuse/core";
import { StoreApp } from "@/services/stores";

const appLocalStorage = useStorage(
  "AppLocalStorage",
  {
    userData: {
      account: {
        _id: "",
        email: "",
        moneyBalance: 0,
        role: "",
        status: "",
        createdAt: "",
        updatedAt: "",
      },
      user: {
        _id: "",
        accountId: "",
        avatar: "",
        fullName: "",
        dateOfBirth: null,
        phoneNumber: "",
        gender: "",
        createdAt: "",
        updatedAt: "",
      },
    },
    accessToken: "",
  },
  localStorage,
  { mergeDefaults: true }
);

const userData = computed(() => {
  return {
    ...appLocalStorage.value.userData.account,
    ...appLocalStorage.value.userData.user,
  };
});

const accessToken = computed(() => appLocalStorage.value?.accessToken);

const onDeleteAppLocalStorage = () => {
  StoreApp().onActionLoadingActive(true, "Đang đăng xuất...");
  localStorage.removeItem("AppLocalStorage");

  appLocalStorage.value = {
    userData: {},
    accessToken: "",
  };

  router.replace({ name: "Home" });

  setTimeout(() => {
    StoreApp().onActionLoadingActive(false);
  }, 1000);
};

const isMobileScreen = computed(() => window.innerWidth < 500);

const isEmpty = (value) => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && !value.length) ||
    (!!value && value.constructor === Object && Object.keys(value).length === 0)
  );
};

const stringWithoutAccents = (value) => {
  if (!value) return value;
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d");
};

const formatDate = (dateString, showTime = false) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return showTime ? `${formattedTime} ${formattedDate}` : formattedDate;
};

const formatDateToDDMMYY = (date) => {
  // Kiểm tra nếu 'date' không phải là đối tượng Date
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Lấy thông tin ngày, tháng, năm
  var day = date.getDate();
  var month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  var year = date.getFullYear();

  // Chuyển đổi số thành chuỗi và thêm '0' đằng trước nếu cần
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Trả về chuỗi định dạng "dd-mm-yyyy"
  return day + "-" + month + "-" + year;
};

const formatToVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phoneNumber);
};

const isValidName = (name) => {
  const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,}$/;
  return nameRegex.test(name);
};

const onRenderStringBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const fileBase64 = {
        name: file.name.split(" ").join("-"),
        base64: reader.result.split(",")[1],
      };
      resolve(fileBase64);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const onCopyText = (text) => {
  // Tạo một vùng chứa (textarea) ẩn để chứa văn bản cần sao chép
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea); // Thêm textarea vào body

  // Chọn văn bản trong textarea và sao chép vào clipboard
  textarea.select();
  document.execCommand("copy");

  // Loại bỏ textarea đã tạo ra khỏi DOM
  document.body.removeChild(textarea);
};

const onValidAccountName = (accountName) => {
  // Kiểm tra xem tên tài khoản có ít nhất 6 ký tự
  // và chứa ít nhất một số, và không viết hoa
  const regex = /^(?=.*\d)(?=.*[a-z])[a-z0-9]{6,}$/;
  return regex.test(accountName);
};

const onValidPassword = (password) => {
  // Kiểm tra xem mật khẩu có ít nhất 6 ký tự,
  // bao gồm ít nhất một số và một ký tự đặc biệt
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{6,}$/;
  return regex.test(password);
};

const formatNumberIntl = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const convertNewline = (inputString) => {
  return inputString.replace(/\\n/g, "\n");
};

export {
  isEmpty,
  onCopyText,
  formatDate,
  isValidName,
  formatToVND,
  convertNewline,
  onValidPassword,
  formatNumberIntl,
  formatDateToDDMMYY,
  onValidAccountName,
  isValidPhoneNumber,
  stringWithoutAccents,
  onRenderStringBase64,
  onDeleteAppLocalStorage,
  // ------------- //
  userData,
  accessToken,
  isMobileScreen,
  appLocalStorage,
};
