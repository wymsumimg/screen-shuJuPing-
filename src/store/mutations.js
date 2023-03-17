const mutations = {
 

  // AUTOLOGIN(state,value){
  //   state.keepLogin=value
  //   if(state.keepLogin){
  //     localStorage.setItem('facCode',value)
  //     localStorage.setItem('username',value)
  //     localStorage.setItem('password',value)
  //   }else{
  //     localStorage.removeItem('facCode')
  //     localStorage.removeItem('username')
  //     localStorage.removeItem('password')
  //   }
  // },
  // 工厂编码
  SET_FacCode(state,value){
    state.facCode=value
    // localStorage.setItem('facCode',value)
  },
  // 用户名
  SET_Username(state,value){
    state.username=value
    localStorage.setItem('username',value)
  },
  // 密码
  SET_Password(state,value){
    state.password=value
    localStorage.setItem('password',value)
  },
  // 天气
  SET_Weather(state,value){
    state.weather=value
  },
  //更新主题颜色
  setThemeColor(state,curcolor){
      this.state.themecolor = curcolor;
  },
   //更新时间
   SET_DATEINFO(state,dateInfo){
    this.state.dateInfo = dateInfo;
   },
  loginStaus(state, value) {
    state.login_staus=value
  },
}
export default mutations
