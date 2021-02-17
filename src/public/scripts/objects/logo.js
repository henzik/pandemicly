function Logo(x, y) {
    const style = new PIXI.TextStyle({
      fill: '#ff0000'
    })
    const logo = new PIXI.Text('PANDEMIC', style);
    logo.x = x;
    logo.y = y;
    logo.anchor.set(0.5);

    return logo;
}
export { Logo }