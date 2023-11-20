export function getFileIcon(fileTypeOrName: string) {
  const fileIcons: Record<string, string> = {
    ai: '/img/icons/files/ai.svg',
    doc: '/img/icons/files/doc-2.svg',
    kth: '/img/icons/files/presentation.svg',
    pdf: '/img/icons/files/pdf.svg',
    ppt: '/img/icons/files/ppt.svg',
    xlsx: '/img/icons/files/sheet.svg',
    wmv: '/img/icons/files/video.svg',
    mp4: '/img/icons/files/video.svg',
    zip: '/img/icons/files/zip-format.svg',
    default: '/img/icons/files/doc-2.svg',
  };

  if (!fileTypeOrName) {
    return fileIcons.default;
  }

  const extension = (
    (fileTypeOrName.includes('.') ? fileTypeOrName.split('.').pop() : fileTypeOrName) || 'default'
  ).toLowerCase();

  return fileIcons[extension] || fileIcons.default;
}
