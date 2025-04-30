import mitt, {Emitter} from 'mitt';

// 创建事件总线实例
const emitter:Emitter<any> = mitt();

// 导出事件总线
export default emitter; 