import {reactive} from "vue"
import {useCardStorage} from "../../../composables/useCards"

// as global state management
const storage = reactive(useCardStorage())

export default function useCardStorage() {
  return storage
}
