<script setup>
import * as Yup from "yup";
import { useRouter } from "vue-router";
import { watch, onMounted, reactive } from "vue";
import ButtonBack from "./components/ButtonBack.vue";
import { userData, onRenderStringBase64 } from "@/utils";
import { STORE_VIRTUAL_ASSISTANT } from "@/services/stores";
import { useForm, useField, useFieldArray } from "vee-validate";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";

const ROUTER = useRouter();

const {
  onGetterVirtualAssistant: virtualAssistant,
  onActionGetVirtualAssistant,
  onActionSaveVirtualAssistant,
} = STORE_VIRTUAL_ASSISTANT.StoreVirtualAssistant();

const data = reactive({
  userId: userData.value._id,
  system: "",
});

const formData = reactive({
  userId: userData.value._id,
  name: null,
  instructions: null,
  files: [],
});

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên trợ lý"),
  instructions: Yup.string().required("Vui lòng nhập hướng dẫn cho trợ lý"),
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

const { value: instructions, errorMessage: errInstructions } =
  useField("instructions");

const { push, remove } = useFieldArray("files");

const onUploadFile = async (event) => {
  const file = await onRenderStringBase64(event.target.files[0]);
  push(file);

  // Reset the input
  const inputFile = document.getElementById("inputFile");
  inputFile.value = "";
};

const onClickRemoveFile = (index) => {
  remove(index);
};

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveVirtualAssistant(infoData);
  if (res.success) {
    onActionGetVirtualAssistant(data.userId, true);
  }
});

watch(virtualAssistant, (newValue) => {
  resetForm({ values: Object.assign(formData, newValue) });
});

onMounted(() => {
  onActionGetVirtualAssistant(data.userId);
});
</script>

<template>
  <ButtonBack @onClick="ROUTER.replace({ name: 'VirtualAssistant' })" />

  <div style="max-width: 52rem" class="m-auto pt-3">
    <div class="flex flex-column gap-2 align-items-center">
      <span class="text-custom-1 flex">Cấu hình bot</span>
      <span style="max-width: 30rem" class="text-700 line-height-2 text-center">
        Bạn hãy cung cấp thông tin chuẩn xác để bot có thể học và trả lời tự
        nhiên và đúng nhất.
      </span>
    </div>

    <br />

    <div class="w-full text-right">
      <Button label="Lưu cấu hình" @click="onSubmit" />
    </div>

    <div class="flex flex-column gap-3">
      <InputTextValidate label="Tên trợ lý" name="name" class="w-full" />

      <div class="flex flex-column gap-2">
        <div>Hướng dẫn cho trợ lý <span class="p-error">*</span></div>
        <div>
          <Textarea
            v-model="instructions"
            rows="8"
            class="w-full"
            placeholder="Hướng dẫn cho bot..."
          />
          <small v-show="errInstructions" class="p-error">
            {{ errInstructions }}
          </small>
        </div>
      </div>

      <div class="flex flex-column gap-2">
        <div class="flex align-items-center gap-2">
          <span>Thêm tệp tin</span>

          <div style="overflow: hidden" class="relative">
            <i class="pi pi-plus-circle on-click text-800" />
            <input
              type="file"
              id="inputFile"
              class="absolute top-0 right-0 left-0 bottom-0 opacity-0 on-click"
              accept=".txt, .xlsx, csv"
              @change="onUploadFile"
            />
          </div>
        </div>

        <div class="flex flex-column gap-2">
          <div v-for="(file, index) in infoData.files" :key="index">
            <div class="flex align-items-center gap-1">
              <span class="text-700">{{ file.name }}</span>
              <i
                class="pi pi-times-circle text-700"
                @click="onClickRemoveFile(index)"
              />
            </div>
          </div>

          <div v-if="!infoData.files.length" class="text-custom-mini text-700">
            Chưa có tệp tin nào.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
