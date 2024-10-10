export interface IProvince {
    id: number,
    name: string,
    ghn_id: string,
    tag: string,
    nation_id: 1
}

export interface IProvinceState {
    provinceList: IProvince[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}