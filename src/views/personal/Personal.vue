<script setup>
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { STORE_PERSONAL } from "@/services/stores";
import IconTitle from "@/components/common/IconTitle.vue";
import { computed, onMounted, reactive, watch } from "vue";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import DropdownValidate from "@/components/validation/DropdownValidate.vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import {
  appLocalStorage,
  userData,
  isValidPhoneNumber,
  formatDateToDDMMYY,
} from "@/utils";

const {
  onGetterUserInfo: userInfo,
  onActionGetUserInfo,
  onActionSaveUserInfo,
} = STORE_PERSONAL.StorePersonal();

const formData = reactive({
  avatar: null,
  fullName: "",
  gender: "",
  dateOfBirth: null,
  phoneNumber: null,
});

const userId = computed(() => userData.value._id);

const schema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  dateOfBirth: Yup.string().required("Vui lòng nhập ngày sinh"),
  phoneNumber: Yup.string()
    .test(
      "phoneNumber",
      "Vui lòng nhập đúng định dạng số điện thoại",
      (value) =>
        value.length >= 10 && value.length <= 12 && isValidPhoneNumber(value)
    )
    .required("Vui lòng nhập số điện thoại"),
});

const {
  values: infoData,
  resetForm,
  setFieldValue,
  handleSubmit,
} = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveUserInfo(userId.value, infoData);
  if (res.success) {
    onActionGetUserInfo(userId.value, true).then((res) => {
      if (res.success) appLocalStorage.value.userData = res?.data;
    });
  }
});

watch(userInfo, (newValue) => {
  const user = newValue.user;

  resetForm({ values: Object.assign(formData, user) });

  if (user.avatar) {
    setFieldValue("avatar", {
      name: user?.avatar.split("$")[1],
      base64: user?.avatar,
    });
  }

  if (user.dateOfBirth) {
    setFieldValue("dateOfBirth", formatDateToDDMMYY(user.dateOfBirth));
  }
});

onMounted(() => {
  onActionGetUserInfo(userId.value);
});
</script>

<template>
  <div class="flex flex-column gap-4">
    <IconTitle icon="pi pi-user" title="Thông tin tài khoản" />

    <div class="flex flex-wrap-reverse gap-6">
      <div style="max-width: 25rem" class="flex-1 flex flex-column gap-3">
        <InputTextValidate label="Họ và tên" name="fullName" class="w-full" />

        <DropdownValidate
          label="Giới tính"
          name="gender"
          :options="[
            { name: 'Nam', code: 'male' },
            { name: 'Nữ', code: 'female' },
            { name: 'Khác', code: 'other' },
          ]"
        />

        <InputTextValidate
          label="Ngày sinh"
          name="dateOfBirth"
          class="w-full"
        />

        <InputTextValidate
          label="Số điện thoại"
          name="phoneNumber"
          class="w-full"
          type="number"
        />

        <Button label="Lưu thông tin" @click="onSubmit" />
      </div>

      <div class="image-container w-25rem flex flex-column gap-3">
        <ImageValidate
          label="Ảnh đại diện"
          name="avatar"
          class="image w-10rem h-10rem"
          :required="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 500px) {
  .image-container {
    align-items: center;
  }
}
</style>
