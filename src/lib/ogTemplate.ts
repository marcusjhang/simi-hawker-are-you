export function escapeXml(value: string): string {
  const map: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  };
  return value.replace(/[<>&'"]/g, (c) => map[c]!);
}

export function ogSvg(name: string, tagline: string, art = ''): string {
  const dish = escapeXml(name);
  const line = escapeXml(tagline);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FBF3E4"/>
  <rect x="40" y="40" width="1120" height="550" fill="#FFFBF0" stroke="#8A5A2B" stroke-width="6"/>
  <rect x="54" y="54" width="1092" height="522" fill="none" stroke="#C0392B" stroke-width="3"/>
  <g transform="translate(600,210) scale(2.0)">${art}</g>
  <text x="600" y="66" text-anchor="middle" font-family="monospace" font-size="24" letter-spacing="6" fill="#C0392B">YOU CONFIRM ARE...</text>
  <text x="600" y="392" text-anchor="middle" font-family="Georgia, serif" font-size="80" font-weight="bold" fill="#5B3A1E">${dish}</text>
  <text x="600" y="452" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#8A5A2B">${line}</text>
  <text x="600" y="560" text-anchor="middle" font-family="monospace" font-size="22" letter-spacing="5" fill="#8A5A2B">SIMI HAWKER ARE YOU?</text>
</svg>`;
}

export interface ResultPageInput {
  id: string;
  name: string;
  tagline: string;
  site: string;
}

export function resultPage({ id, name, tagline, site }: ResultPageInput): string {
  const title = `${name} - Simi Hawker Are You?`;
  const description = escapeXml(tagline);
  const image = `${site}/result/${id}/og.png`;
  const url = `${site}/result/${id}/`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeXml(title)}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${escapeXml(title)}" />
<meta property="og:type" content="website" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${url}" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0; url=../../index.html#/result?r=${id}" />
</head>
<body>
<p>You got ${escapeXml(name)}. <a href="../../index.html#/result?r=${id}">See your result</a>.</p>
</body>
</html>`;
}
