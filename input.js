export default class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      const activeKey = e.key.toUpperCase();
      if((activeKey === 'ARROWLEFT' ||
         activeKey === 'ARROWRIGHT' ||
         activeKey === 'ARROWDOWN' ||
         activeKey === 'ARROWUP' ||
         activeKey === ' ' ||
         activeKey === 'D' ||
         activeKey === 'A' ||
         activeKey === 'S' ||
        activeKey === 'W') &&
         !this.keys.includes(activeKey)) {
        this.keys.push(activeKey);
      }
    });
    
    window.addEventListener('keyup', (e) => {
      const activeKey = e.key.toUpperCase();
      if(activeKey === 'ARROWLEFT' ||
         activeKey === 'ARROWRIGHT' ||
         activeKey === 'ARROWDOWN' ||
         activeKey === 'ARROWUP' ||
         activeKey === ' ' ||
         activeKey === 'D' ||
         activeKey === 'A' ||
         activeKey === 'S' ||
         activeKey === 'W') {
        this.keys = this.keys.filter(key => key !== activeKey)
      }
    });
  }
}