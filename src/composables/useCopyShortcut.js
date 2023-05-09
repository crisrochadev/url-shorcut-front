import { useQuasar } from "quasar";

export default function useCopyShortcut() {
  const $q = useQuasar();

  function copyShortcut(shortcut) {
    navigator.clipboard
      .writeText(shortcut)
      .then(() => {
        $q.notify({
          color: "blue-5",
          message: "Url encurtada copiada para área de transferência",
          timeout: 1500,
        });
      })
      .catch((error) => {
        $q.notify({
          color: "blue-5",
          message: "Url não pode ser copiada para área de transferência",
          timeout: 1500,
        });
      });
  }

  return { copyShortcut };
}
