export async function renderCard(node: HTMLElement): Promise<Blob> {
  const { toBlob } = await import('html-to-image');
  const blob = await toBlob(node, {
    width: 1080,
    height: 1350,
    pixelRatio: 1,
    backgroundColor: '#FBF3E4',
    cacheBust: true,
  });
  if (!blob) throw new Error('Result card render failed');
  return blob;
}
