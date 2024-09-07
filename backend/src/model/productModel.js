import pool from "../config/db";

const getProductLimit = async ({limit = 5, order_by = "id_asc", page = 1 }) => {
    const [campo, orden] = order_by.split("_");
    const offset = Math.abs((page - 1) * limit);

    const query = `SELECT * FROM products ORDER BY ${campo} ${orden} LIMIT ${limit} OFFSET ${offset}`;
    
        const result = await pool.query(query);
        result.rowCount >= 0 ? console.log(`Se encontraron ${result.rowCount} productos`) : console.log(`No se encontraron productos 😭`);
        console.log('query:::',result);
        console.error('Error al obtener el usuario 😳:', error);
        return result.rows[0];
    };

    const getProducts = async () => {
        const query = `SELECT * FROM products`;
        const result = await pool.query(query);
        return result.rows;
    };

    const getProductsFiltered = async ({ price_min, price_max, category, name }) => {
        let filtros = [];
      
        if (price_min) filtros.push(`price >= ${price_min}`);
        if (price_max) filtros.push(`price <= ${price_max}`);
        if (category) filtros.push(`category = '${category}'`);
        if (name) filtros.push(`name = '${name}'`);
      console.log('filtro array:::',filtros);
        let consulta = "SELECT * FROM products";
      
        if (filtros.length > 0) {
          filtros = filtros.join(" AND ");
          consulta += ` WHERE ${filtros}`;
        }
      
        const { rows: products } = await pool.query(consulta);
      
        return products;
      };

      const createProduct = async (product) => {
        const { name, description, price, category } = product;
      
        const query = `
          INSERT INTO products (name, description, price, category)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `;
      
        const values = [name, description, price, category];
      
        try {
          const result = await pool.query(query, values);
          if (result.rowCount > 0)  return { success: true, data: result.rows[0] };
        } catch (error) {
          console.error('Error al crear el producto:', error);
          return { success: false, message: 'Error al crear el producto' };
        }
      };

      const updateProduct = async (product) => {
        const { id, name, description, price, category } = product;
      
        const query = `
          UPDATE products
          SET name = $1, description = $2, price = $3, category = $4
          WHERE id = $5
          RETURNING *
        `;
      
        const values = [name, description, price, category, id];
      
        try {
          const result = await pool.query(query, values);
          if (result.rowCount > 0)  return { success: true, data: result.rows[0] };
        } catch (error) {
          console.error('Error al crear el proyecto:', error);
          return { success: false, message: 'Error al crear el proyecto' };
        }
      };

      const deleteProduct = async (id) => {
        const query = `
          DELETE FROM products
          WHERE id = $1
          RETURNING *
        `;
      
        const values = [id];
      
        try {
          const result = await pool.query(query, values);
          if (result.rowCount > 0)  return { success: true, data: result.rows[0] };
        } catch (error) {
          console.error('Error al crear el proyecto:', error);
          return { success: false, message: 'Error al crear el proyecto' };
        }
      };
    

export const productModel = {
    getProductLimit,
    getProducts,
    getProductsFiltered,
    createProduct,
    updateProduct,
    deleteProduct,
};
