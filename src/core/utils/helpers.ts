import config from 'config';
class Helpers {
  formatMoney(money: number) {
    return Number(money).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
  parseImageUrl(
    pathOrigin: string | null,
    resize: { width: number; height: number }
  ): string {
    if (!pathOrigin) return '/images/no-image.jpg';
    const baseURL = config.images.baseUrl;
    let path = pathOrigin;
    if (path.includes('https://minio.vnstore.xyz/hiweb-development')) {
      path = path.replace('https://minio.vnstore.xyz/hiweb-development/', '/');
    } else if (path.includes('https://minio.lattehub.com/lattehub')) {
      return path.replace(
        '/lattehub/',
        `/img/${resize.width}/${resize.height}/resize/`
      );
    } else if (
      path.match(
        /^https:\/\/(minio\.lattehub\.com|minio\.vnstore\.xyz)\/img\/[0-9]+\/[0-9]+\/resize\//
      )
    ) {
      return path.replace(
        /\/img\/[0-9]+\/[0-9]+\/resize\//,
        `/img/${resize.width}/${resize.height}/resize/`
      );
    }
    if (resize) {
      path = `/img/${resize.width}/${resize.height}/resize${path}`;
    } else path = `/img/${50}/${50}/resize${path}`;
    if (
      path.includes('https://minio.vnstore.xyz/') &&
      !path.includes('resize')
    ) {
      // image oldold
      path = path.replace(
        'https://minio.vnstore.xyz/',
        'https://minio.lattehub.com/'
      );
      return path && (path.includes('https://') || path.includes('data:image'))
        ? path
        : baseURL + path;
    } else {
      return path && (path.includes('https://') || path.includes('data:image'))
        ? pathOrigin
        : baseURL + path;
    }
  }
  capitalize(text: string) {
    const words = text.split(' ');
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(' ');
  }
}
const helpers = new Helpers();
export default helpers;
