import { htmlToText } from 'html-to-text';

export function parseHtmlToText(htmlString : string) {
    const options = {
        wordwrap : 600,
        selectors: [{ selector: 'a', options: { noAnchorUrl: true, ignoreHref: true } }]
    }
    return htmlToText(htmlString,options);
}