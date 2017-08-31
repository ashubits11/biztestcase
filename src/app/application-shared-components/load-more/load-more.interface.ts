
export interface IDimensions {
    width: number;
    height: number;
}


export class Dimensions {
    width: number;
    height: number;
    constructor(obj?: IDimensions) {
        this.width = obj && obj.width ? obj.width : 500;
        this.height = obj && obj.height ? obj.height : 500;
    }

    changeDimensions(obj: IDimensions) {
        this.width = obj.width;
        this.height = obj.height;
    }
}

export interface ILoadMoreOptions {
    totalColumns: number;
    columnsPerRow?: number;
    heightOfContainer?: number;
}

export class LoadMoreOptions {
    columnsPerRow?: number;
    heightOfContainer?: number;
    totalColumns: number;
    constructor(obj?: ILoadMoreOptions) {
        this.totalColumns = obj && obj.totalColumns ? obj.totalColumns : 100;
        this.columnsPerRow = obj && obj.columnsPerRow ? obj.columnsPerRow : 1;
        this.heightOfContainer = obj && obj.heightOfContainer ? obj.heightOfContainer : 100;
    }
}

