import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../main/consts'

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`)
}

export function signuo(values) {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

export function logout() {
    return { type: consts.TOKEN_VALIDATED, payload: false }
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    { type: consts.USER_FETCHED, payload: resp.data }
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Error', error))
            })
    }
}

function validateToken(token) {
    return dispatch => {
        if(token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, {token} )
                .then(resp => {
                    dispatch({ type: consts.TOKEN_VALIDATED, payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: consts.TOKEN_VALIDATED, payload: false }))
        } else {
            dispatch({ type: consts.TOKEN_VALIDATED, payload: false })
        }
    }
}