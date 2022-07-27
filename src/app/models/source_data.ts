export class SourceData {
    dimension?: DimensionOption[];
    fact?: Fact[];
}

export class GHOOption{
    label?: string;
    checked?: boolean;
    display?: string;
}

export class DimensionOption{
    label?: string;
    display?: string;
    checked?: boolean;
}

export class Fact{
    dim?: DimensionObject;
    Value?: string;
}

export class DimensionObject{
    PUBLISHSTATE?: string;
    REGION?: string;
    GHO?: string;
    YEAR?: string;
    COUNTRY?: string;
    GOEQUESTION?: string;
}