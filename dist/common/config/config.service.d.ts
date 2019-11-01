export interface EnvConfig {
    [key: string]: string;
}
export declare class ConfigService {
    private readonly envConfig;
    constructor();
    private validateInput;
    readonly isApiAuthEnabled: boolean;
    readonly port: number;
    readonly dbType: any;
    readonly dbHost: string;
    readonly dbPort: number;
    readonly dbName: string;
    readonly dbUser: string;
    readonly dbPwd: string;
    readonly uri: string;
    readonly bucketName: string;
    readonly bucketId: string;
    readonly bucketKey: string;
    readonly bucketRegion: string;
    readonly fcmKey: string;
}
