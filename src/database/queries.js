"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStyles = exports.getProductById = exports.getProducts = void 0;
exports.getProducts = 'SELECT * FROM product LIMIT 10';
exports.getProductById = `
  SELECT *, (
      SELECT array(
        SELECT json_build_object(
          'feature', feature,
          'value', value
        ) 
        FROM features
        WHERE product_id = $1
      ) AS features
    )
  FROM product
  WHERE id = $1
`;
exports.getProductStyles = `
  SELECT product_id, (
    SELECT array(
      SELECT json_build_object(
        'style_id', id,
        'name', name,
        'original_price', original_price,
        'sale_price', sale_price,
        'default?', default_style,
        'photos', (
          SELECT array(
            SELECT json_build_object(
              'thumbnail_url', thumbnail_url,
              'url', url
            )
            FROM photos
            WHERE style_id = s.id
          ) AS photos
        ),
        'skus', (
          SELECT (
            json_object_agg(
              id, json_build_object(
                'quantity', quantity,
                'size', size
              )
            )
          )
          FROM skus
          WHERE style_id = styles.id
        )
      )
      FROM styles s
      WHERE product_id = $1
    ) AS results
  )
  FROM styles
  WHERE product_id = $1
`;
//# sourceMappingURL=queries.js.map