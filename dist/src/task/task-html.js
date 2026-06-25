"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeTaskHtml = sanitizeTaskHtml;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const allowedIframeHosts = new Set(['www.youtube.com', 'youtube.com', 'player.vimeo.com']);
const baseAllowedTags = [
    'p',
    'br',
    'strong',
    'em',
    's',
    'u',
    'mark',
    'blockquote',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'hr',
    'pre',
    'code',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'img',
    'a',
    'span',
    'div',
    'input',
    'iframe',
];
const taskHtmlOptions = {
    allowedTags: baseAllowedTags,
    allowedAttributes: {
        a: ['href', 'target', 'rel', 'title'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        span: ['class', 'data-type', 'data-id', 'data-label', 'data-user-id'],
        div: ['class', 'data-type', 'data-id', 'data-label'],
        input: ['type', 'checked', 'disabled'],
        iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder'],
        th: ['colspan', 'rowspan'],
        td: ['colspan', 'rowspan'],
        code: ['class'],
        pre: ['class'],
        p: ['data-indent'],
        ul: ['data-type'],
        ol: ['start', 'data-type'],
        li: ['data-checked'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
        img: ['http', 'https', 'data'],
        iframe: ['http', 'https'],
    },
    allowProtocolRelative: false,
    transformTags: {
        a: sanitize_html_1.default.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }),
        iframe: (tagName, attribs) => {
            const src = String(attribs.src || '');
            try {
                const parsed = new URL(src);
                if (!allowedIframeHosts.has(parsed.hostname)) {
                    return {
                        tagName: 'span',
                        attribs: {},
                        text: '',
                    };
                }
            }
            catch (_error) {
                return {
                    tagName: 'span',
                    attribs: {},
                    text: '',
                };
            }
            return {
                tagName,
                attribs: {
                    ...attribs,
                    allowfullscreen: 'true',
                    frameborder: '0',
                },
            };
        },
    },
};
function sanitizeTaskHtml(value) {
    const raw = String(value ?? '').trim();
    if (!raw) {
        return '';
    }
    return (0, sanitize_html_1.default)(raw, taskHtmlOptions);
}
