export const algo = (state, payload) => {
  let items = state.items;
  let total = state.total;

  if (Array.isArray(payload)) {
    payload.forEach(p => {
      items.push({ ...p })
    })
  } else {
    let selected = items.findIndex(i => i.pid === payload.ID)
    if (selected === -1) {
      items.push({
        pid: payload.ID,
        quantity: payload.quantity,
        price: payload.price
      })
    } else {
      items[selected].quantity = payload.quantity;
      if (items[selected.quantity] === 0) {
        items.splice(selected, 1)
      }
    }

  }
  total = 0;
  items.forEach(element => {
    total += element.price * element.quantity
    if ((element.ID === 1) && (element.quantity >= 7)) {
      total -= 0.1 * element.quantity
    }
  });

  return {
    items,
    total
  }
}