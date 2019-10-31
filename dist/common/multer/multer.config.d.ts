export declare const multerConfig: {
    dest: string;
};
export declare const multerOptions: (type: string) => {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: any;
};
