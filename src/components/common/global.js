

import Vue from 'vue';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import jaLocale from 'element-ui/lib/locale/lang/ja';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from 'element-ui/lib/locale/lang/en';
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ch',
  messages: {
    ch: Object.assign(require('../../assets/language/zh'), zhLocale),
    jp: Object.assign(require('../../assets/language/jp.js'), jaLocale),
    en: Object.assign(require('../../assets/language/en.js'), enLocale)
  }
});

Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
});

const filtersZT = [
  { text: i18n.t('menu.shoudong'), value: 99 },
  { text: i18n.t('menu.lixian'), value: -1 },
  { text: i18n.t('menu.fuwei'), value: 0 },
  { text: i18n.t('menu.tingzhi'), value: 1 },
  { text: i18n.t('menu.yunxing'), value: 2 },
  { text: i18n.t('menu.zanting'), value: 3 },
  { text: i18n.t('menu.kaiji'), value: 4 },
  { text: i18n.t('menu.huiyuandian'), value: 5 },
  { text: i18n.t('menu.yure'), value: 6 },
  { text: i18n.t('menu.lashuiping'), value: 7 },
  { text: i18n.t('menu.dabiaofenzhong'), value: 8 },
  { text: i18n.t('menu.huandaoduidao'), value: 9 },
  { text: i18n.t('menu.huanchengxu'), value: 10 },
  { text: i18n.t('menu.jiancha'), value: 11 }
]
const statusColor = {
  '-1': 'lx',
  0: 'fw',
  1: 'tz',
  2: 'yx',
  3: 'zt',
  99: 'sd',
  4: 'sd',
  5: 'sd',
  6: 'sd',
  7: 'sd',
  8: 'sd',
  9: 'sd',
  10: 'sd',
  11: 'sd'
}
const status = {
  '-1': i18n.t('menu.lixian'),
  0: i18n.t('menu.fuwei'),
  1: i18n.t('menu.tingzhi'),
  2: i18n.t('menu.yunxing'),
  3: i18n.t('menu.zanting'),
  99: i18n.t('menu.shoudong'),
  4: i18n.t('menu.kaiji'),
  5: i18n.t('menu.huiyuandian'),
  6: i18n.t('menu.yure'),
  7: i18n.t('menu.lashuiping'),
  8: i18n.t('menu.dabiaofenzhong'),
  9: i18n.t('menu.huandaoduidao'),
  10: i18n.t('menu.huanchengxu'),
  11: i18n.t('menu.jiancha')
}

const statusColorbg = {
  '-1': 'lxbg',
  0: 'fwbg',
  1: 'tzbg',
  2: 'yxbg',
  3: 'ztbg',
  99: 'sdbg',
  4: 'sdbg',
  5: 'sdbg',
  6: 'sdbg',
  7: 'sdbg',
  8: 'sdbg',
  9: 'sdbg',
  10: 'sdbg',
  11: 'sdbg'
}
const languageOptions = [
  {
    value: "ch",
    label: "中文",
  },
  // {
  //   value: "jp",
  //   label: "日本語",
  // },
  {
    value: "en",
    label: "English",
  },
]
export default {
  filtersZT,
  statusColor,
  status,
  statusColorbg,
  languageOptions
}