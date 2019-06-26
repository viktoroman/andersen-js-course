class Musician {
  constructor(albumsUrl) {
    this.albumsUrl = albumsUrl;
  }

  async getAlbums() {
    const responseAlbums = await fetch(this.albumsUrl);
    return responseAlbums.json();
  }
}

export default Musician;
