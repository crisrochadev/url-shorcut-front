import { useQuasar } from "quasar";

export default function useScreenView() {
  const $q = useQuasar();
  return $q.screen.width < 780;
}
