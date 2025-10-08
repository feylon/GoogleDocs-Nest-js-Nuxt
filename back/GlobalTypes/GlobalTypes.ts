export interface SENDBODY {
    success: boolean,
    data: any,
    status?: number;
    message?: string,
    page?: number,
    size?: number,
    totalpages?: number;
    error? : any,
    count?:number
}


