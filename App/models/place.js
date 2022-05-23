class Place {
  constructor(title, imageURI, address, location) {
    this.title = title;
    this.imageURI = imageURI;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
