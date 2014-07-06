declare module angularjs.toaster {

    export interface IToaster {

        pop(type?: string,
            title?: string,
            body?: string,
            timeout?: number,
            bodyOutputType?: string,
            clickHandler?: (toaster: IToaster) => void): void;

        clear(): void;
    }

    export interface IIconClasses {
        error: string;
        info: string;
        success: string;
        wait: string;
        warning: string;
    }

    export interface IConfigurationOptions {
        'body-output': string;
        'body-template': string;
        'close-button': boolean;
        'icon-class': string;
        'icon-classes': IIconClasses;
        limit: number;
        'message-class': string;
        'newest-on-top': boolean;
        'position-class': string;
        'tap-to-dismiss': boolean;
        'time-out': number;
        'title-class': string;

    }

}