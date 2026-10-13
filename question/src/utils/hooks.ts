import type { Status } from '@/types';
import { isSurveyComName } from '.';

// 得到画布中组件的序号列表
export const useMaterialNo = (coms: Status[]) => {
  let no = 0;
  return coms.map((com) => {
    if (isSurveyComName(com.name)) {
      no++;
      return no;
    }
    return null;
  });
};
