export namespace Base64 {

    const keyStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function utf8Decode(utftext: string): string {
        let result: string = "";
        let i: number = 0;
        let c: number = 0;
        let c2: number = 0;
        let c3: number = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                result += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                /* tslint:disable */
                result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                /* tslint:enable */
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                /* tslint:disable */
                result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                /* tslint:enable */
                i += 3;
            }

        }

        return result;
    }

    export function decode(input: string): string {
        let output: string = "";
        let chr1: number;
        let chr2: number;
        let chr3: number;
        let enc1: number;
        let enc2: number;
        let enc3: number;
        let enc4: number;
        let i: number = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            /* tslint:disable */
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            /* tslint:enable */

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        return utf8Decode(output);
    }

}
