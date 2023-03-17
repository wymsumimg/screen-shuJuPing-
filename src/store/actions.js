const actions = {
  setShow({commit},data){
    return new Promise((resolve,reject)=>{
      commit('SET_SHOW', data);
      resolve()
    })
  },
  setDateInfo(conText, payload) {
    conText.commit('SET_DATEINFO', payload)
  }
}
export default actions
