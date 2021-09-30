const login = () => {
    return fetch('http://localhost:8080/login')
        .then(response => response.json())
        .catch(e => [])
};

export default login;
  