import domainsFuc from './domains'
import originAxios from 'axios'
import {TokenKeys} from '@/utils/variable'


let setAxios2 = originAxios.create({
  baseURL: domainsFuc(TokenKeys.PRODUCT_ENV).domain2,
  timeout: 20000, 
});
export default setAxios2
