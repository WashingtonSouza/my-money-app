import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL ='http://localhost:3003/api',
    INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    const id = values._id ? values._id : ''

    return dispatch => {
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Success', 'Operation successfully performed')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Error', error))
            })
    }
}

export function showUpdate(billingCycle) {
    return showTab('tabUpdate', 'billingCycleForm', billingCycle)
}

export function showDelete(billingCycle) {
    return showTab('tabDelete', 'billingCycleForm', billingCycle)
}

function showTab(tab, formID, value) {
    return[
        showTabs(tab),
        selectTab(tab),
        initialize(formID, value)
    ]
}

export function init() {
    return [
        showTabs('tabCreate', 'tabList'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}