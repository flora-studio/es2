import {reactive} from "vue"
import useCards from "../../../composables/useCards"

// as global state management
const storage = reactive(useCards())

export default function useCardStorage() {
  return storage
}
