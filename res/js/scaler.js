let siteWidth = 700;
let scale = screen.width / siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + scale + '');