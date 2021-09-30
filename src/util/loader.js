export function uploadcareLoader({ root, src, width, quality }) {
  const isOnCdn = /^https?:\/\/ucarecdn\.com/.test(src)

  if (process.env.NODE_ENV !== 'production') {
    if (!isOnCdn && src.startsWith('/')) {
      throw new Error(
        `Failed to parse "${src}" in "next/image", Uploadcare loader doesn't support relative images`
      )
    }

    if (!isOnCdn && !/^https?:\/\/.+\.ucr\.io\/?$/.test(root)) {
      throw new Error(
        `Failed to parse "${root}" in "next/image", Uploadcare loader expects proxy endpoint like "https://YOUR_PUBLIC_KEY.ucr.io".`
      )
    }
  }

  const filename = src.substring(1 + src.lastIndexOf('/'))
  const extension = filename
    .toLowerCase()
    .split('?')[0]
    .split('#')[0]
    .split('.')[1]

  if (['svg', 'gif'].includes(extension)) {
    return isOnCdn ? src : `${root.replace(/\/$/, '')}${src}`
  }

  /**
   * Output image dimensions is limited to 3000px
   * It can be increased by explicitly setting /format/jpeg/
   */
  const maxResizeWidth = Math.min(Math.max(width, 0), 3000)
  // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png
  const params = ['format/auto', 'stretch/off', `resize/${maxResizeWidth}x`]

  if (quality) {
    /**
     * Uploadcare doesn't support integer-based quality modificators,
     * so we need to map them onto uploadcare's equivalents
     */
    const names = ['lightest', 'lighter', 'normal', 'better', 'best']
    const intervals = [0, 38, 70, 80, 87, 100]
    const nameIdx = intervals.findIndex((min, idx) => {
      const max = intervals[idx + 1]
      return min <= quality && quality <= max
    })
    params.push(`quality/${names[nameIdx]}`)
  } else {
    params.push('quality/smart')
  }

  const paramsString = '/-/' + params.join('/-/') + '/'

  if (isOnCdn) {
    const withoutFilename = src.slice(0, src.lastIndexOf('/'))
    return `${withoutFilename}${paramsString}${filename}`
  }

  return `${root.replace(/\/$/, '')}${paramsString}${src}`
}
