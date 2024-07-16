export default {
  async getHierarchy () {
    const res = await fetch('tree.json')
    return res.json()
  }
}