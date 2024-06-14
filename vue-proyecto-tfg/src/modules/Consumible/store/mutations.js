export const setConsumibles = (state, data) => {
  state.consumibles = data
}

export const setNewConsumible = (state, consumible) => {
  state.consumibles.push(consumible)
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setConsumible = (state, data) => {
  state.consumibles = state.consumibles.map((consumible) => {
    if (consumible.id == data.id) {
      return { ...consumible, ...data.consumible }
    }
    return consumible
  })
}

export const deleteConsumible = (state, id) => {
  state.consumibles = state.consumibles.filter((consumible) => consumible.id != id)
}
