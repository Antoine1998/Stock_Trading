import axios from 'axios'


const Token = 'cfce1bhr01qi5ik0r0dgcfce1bhr01qi5ik0r0e0'

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: Token
    }
})