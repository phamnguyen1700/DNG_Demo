export default interface IWard {
    id: number,
    name: string,
    district_id: number
    ghn_id: string
}


export default interface IWardState {
    status: number,
    message: string,
    data: IWard[]
}