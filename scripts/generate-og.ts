import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { ARCHETYPES } from '../src/data/archetypes';
import { dishMarkup } from '../src/art/dishes';
import { ogSvg, resultPage } from '../src/lib/ogTemplate';

const site = process.env.SITE_URL;
if (!site) {
  throw new Error(
    'SITE_URL is required so OG tags are absolute. Run: SITE_URL=https://your-site.example npm run build',
  );
}
const cleanSite = site.replace(/\/$/, '');
const outRoot = join(process.cwd(), 'dist', 'result');

async function main() {
  for (const dish of ARCHETYPES) {
    const dir = join(outRoot, dish.id);
    await mkdir(dir, { recursive: true });
    const png = await sharp(
      Buffer.from(ogSvg(dish.name, dish.tagline, dishMarkup(dish.id))),
    )
      .png()
      .toBuffer();
    await writeFile(join(dir, 'og.png'), png);
    await writeFile(
      join(dir, 'index.html'),
      resultPage({
        id: dish.id,
        name: dish.name,
        tagline: dish.tagline,
        site: cleanSite,
      }),
    );
  }
  console.log(`Generated ${ARCHETYPES.length} result pages and OG images.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
