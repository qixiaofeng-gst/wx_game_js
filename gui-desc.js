const create_label = (() => {
  let label_count = 0
  return (text => ({
    id: `label_${label_count++}`, component: 'Label',
    text, position: 'center', height: 20, width: 200,
    font: {
      color: '#ffffff',
      size: 15
    }
  }))
})()

const gui = {
  id: 'window',
  component: 'Window',
  draggable: false,
  position: { x: 0, y: 0 },
  width: 250,
  height: 200,
  
  children: [
    {
      id: 'list',
      component: 'List',
      position: { x:0, y:0 },
      dragY: true,
      dragX: false,
      width: 250,
      height: 150,
      layout: [1, 10],
      children: [
        create_label('球球们开始了')
      ]
    },
    {
      id: 'func_1',
      component: 'Button',
      position: { x: 10, y: 160 },
      text: '打招呼',
      width: 230,
      height: 30
    }
  ]
}

export { gui, create_label }
