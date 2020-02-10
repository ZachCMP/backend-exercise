# Green River coding exercise v4

Note: this exercise is open book, feel free to google for what you need

## Exercise Overview:

Use the provided fuel station point data to build a mapping service. Your service should return the set of points contained by a given bounding box as a GeoJSON feature collection. Ensure that your service works correctly by exercising it with the provided map template.

## Steps:

1. Import the provided fuel stations data into your database. We are primarily interested in the coordinate data for this exercise

2. Expose the data as GeoJSON. Write a service that:
  - accepts a parameter for a bounding box. The parameter is a comma-delimited string value with this shape:
    southwest_lng,southwest_lat,northeast_lng,northeast_lat
  - emits a GeoJSON feature collection with features for all stations contained within the given bounding box
    https://tools.ietf.org/html/rfc7946#section-3.3
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [0, 0]
          },
          "properties": {
            "name": "null island"
          }
        }
      ]
    }


3. Use the provided map_template.html snippet to exercise your service

