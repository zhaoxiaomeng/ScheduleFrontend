import request from '@/utils/request'


export function getScheduleList(month) {
    return request({
        url: '/schedule/list',
        method: 'get',
        params: { month }
    })
}