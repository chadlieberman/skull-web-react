export const logger = store => next => action => {
    let result = next(action)
    return result
}
