const Logout = () => {
    localStorage.removeItem('jwt')
    window.location.reload(false)
    return null
}

export default Logout