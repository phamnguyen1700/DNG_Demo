export default interface IDistrict {
    id: number,
    name: string,
    province_id: number,
    ghn_id: string,
    tag: string,
}

export default interface IDistrictState {
    status: number,
    message: string,
    data: IDistrict[]
}