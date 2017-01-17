export declare class Logger {
    debug: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    private loggingPrefix;
    private name;
    private logLevel;
    private loggingEnabled;
    private storageService;
    constructor(name: string);
    private isDebugEnabled();
    private isErrorEnabled();
    private getLoggerName();
}
