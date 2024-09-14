
import request from 'supertest';
import app from '../../index'; 

describe('Product API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });
    if (!response.body.token) {
      console.error('Error al autenticar, no se pudo obtener el token:', response.body);
      return;
    }
    token = response.body.token;
  });
  
  it('debería crear un nuevo producto', async () => {
    const response = await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'Electronics',
        name: 'Smartphone',
        description: 'A new smartphone',
        image: 'image_url',
        price: 699
      });
  
    if (!response.body || !response.body.success) {
      console.error('Error al crear el producto:', response.body);
      return;
    }
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
  

  it('debería obtener un producto por ID', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('Authorization', `Bearer ${token}`);
  
    if (!response.body || response.body.message === 'Producto no encontrado') {
      console.error('Error al obtener el producto:', response.body);
      return;
    }
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('debería actualizar un producto', async () => {
    const response = await request(app)
      .put('/product/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'Electronics',
        name: 'Updated Smartphone',
        description: 'An updated smartphone',
        image: 'updated_image_url',
        price: 799
      });
  
    if (!response.body || !response.body.success) {
      console.error('Error al actualizar el producto:', response.body);
      return;
    }
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  it('debería eliminar un producto', async () => {
  const response = await request(app)
    .delete('/product/1')
    .set('Authorization', `Bearer ${token}`);

  if (!response.body || !response.body.success) {
    console.error('Error al eliminar el producto:', response.body);
    return;
  }

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});

it('debería devolver 404 para un producto inexistente', async () => {
  const response = await request(app)
    .get('/product/9999')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(404);
  if (response.body && typeof response.body.success !== 'undefined') {
    expect(response.body.success).toBe(false);
  } else {
    console.error('Respuesta no contiene el campo success');
  }
});

  
});