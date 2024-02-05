const StaticMaps = require('staticmaps');

const options = {
  width: 600,
  height: 400
};

const generateMap = async (emergency) => {
  const { lat, lon } = emergency;
  const map = new StaticMaps(options);
  const center = [lat, lon];
  const zoom = 15;
  await map.render(center, zoom);
  await map.image.save('/tmp/map.png');
}

exports.generateMap = generateMap;
