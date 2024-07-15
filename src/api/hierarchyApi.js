export default {
  async getHierarchy () {
    const res = await fetch('/dummyData.json')
    return res.json()
  }
}