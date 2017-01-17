import {StorageService} from "../service/StorageService";

export class Logger {

    public debug: (message?: any, ...optionalParams: any[]) => void;
    public error: (message?: any, ...optionalParams: any[]) => void;

    private loggingPrefix: string = "[casino]";
    private name: string;
    private logLevel: string;
    private loggingEnabled: string;

    private storageService: StorageService = StorageService.instance();

    constructor(name: string) {
        this.name = name;

        // if inside Node (testing) don't log
        this.logLevel = process && process.pid ? "FATAL" : "DEBUG";

        this.loggingEnabled = this.storageService.getFeatureLoggingState();

        this.debug = this.isDebugEnabled() ?
            console.log.bind(window.console, "[DEBUG]" + this.getLoggerName() ) :
            () => { return; };

        this.error = this.isErrorEnabled() ?
            console.error.bind(window.console, "[ERROR]" + this.getLoggerName() ) :
            () => { return; };
    }

    private isDebugEnabled(): boolean {
        return this.logLevel === "DEBUG" && this.loggingEnabled === "true";
    }

    private isErrorEnabled(): boolean {
        return (this.logLevel === "DEBUG" || this.logLevel === "ERROR")  && this.loggingEnabled === "true";
    }

    private getLoggerName(): string {
        return this.loggingPrefix + "[" + this.name + "] ";
    }
}
