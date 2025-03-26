// 将网络图片转化成本地图片
export function networkImageToLocal(url: string) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return URL.createObjectURL(blob)
    })
}
