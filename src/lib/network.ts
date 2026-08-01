/**
 * The three sites on this domain.
 *
 * The same three rows — same words, same order of ideas — close about.abdlx.com
 * and sites.abdlx.com, each drawn in that site's own vocabulary. One map, three
 * dialects, so the set reads as one person seen from three angles rather than
 * three pages that happen to share a surname.
 *
 * Read by the footer index in Contact and by the fullscreen menu in Navigation,
 * which is why it lives here rather than in either.
 */
export type NetworkSite = {
    domain: string;
    href: string;
    /** The register this site is written in — the reason to click, in two words. */
    label: string;
    line: string;
    /** Marked rather than linked: this is the site you're already standing on. */
    here?: boolean;
};

export const NETWORK: NetworkSite[] = [
    {
        domain: "abdlx.com",
        href: "https://abdlx.com",
        label: "THE WORK",
        line: "Engineering, AI systems, and what actually shipped.",
        here: true,
    },
    {
        domain: "about.abdlx.com",
        href: "https://about.abdlx.com",
        label: "THE PERSON",
        line: "Who's behind the work, and what I'm on right now.",
    },
    {
        domain: "sites.abdlx.com",
        href: "https://sites.abdlx.com",
        label: "THE CRAFT",
        line: "Websites I build for the pleasure of building them.",
    },
];
