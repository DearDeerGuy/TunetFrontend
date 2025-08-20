
const userToLocalStorage = store => next => action => {
    const result = next(action);
    if (action.type === "user/saveUser") {
        localStorage.setItem("user", JSON.stringify(action.payload));
    }
    if (action.type === "user/clearUser") {
        localStorage.removeItem("user");
    }

    return result;
}

export default userToLocalStorage;