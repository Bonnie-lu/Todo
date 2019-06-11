
import Tolist from './tolist'
class RootStore {
  tolist: Tolist
  constructor() {
    this.tolist = new Tolist()
  }
}

export default RootStore

