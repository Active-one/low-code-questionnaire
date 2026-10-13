// 事件总线
import mitt from 'mitt';
import type { eventBus } from '@/types';

const emitter = mitt<eventBus>();

// 导出
export default emitter;
