import { vi } from 'vitest';
import { FoodService } from '../services/services';

const expectUrlReturn = {
  meals: [{ idMeals: '123', idDrinks: '123' }],
  drinks: [{ idMeals: '123', idDrinks: '123' }],
};

const expectUrlReturnById = [{ idMeals: '123', idDrinks: '123' }];

global.fetch = vi.fn().mockResolvedValue({
  json: async () => expectUrlReturn,
});

describe('Testando service', () => {
  test('Deve criar objeto de FoodService para Meals', () => {
    const service = FoodService('meals');
    expect(service).toBeDefined();
  });
  test('Deve criar objeto de FoodService para Drinks', () => {
    const service = FoodService('drinks');
    expect(service).toBeDefined();
  });
  test('Service deve conter funções de search e getById', () => {
    const service = FoodService('meals');
    expect(service.getById).toBeDefined();
    expect(service.search).toBeDefined();
  });
  test('Service search para Meals deve ser chamado com os argumentos corretos', () => {
    const service = FoodService('meals');
    const spy = vi.spyOn(service, 'search');
    service.search('s', 'teste');
    expect(spy).toHaveBeenCalledWith('s', 'teste');
  });
  test('Service search para Drink deve ser chamado com os argumentos corretos', () => {
    const service = FoodService('drinks');
    const spy = vi.spyOn(service, 'search');
    service.search('s', 'teste');
    expect(spy).toHaveBeenCalledWith('s', 'teste');
  });
  test('Fetch para Meals deve ser chamado com os argumentos corretos', () => {
    const service = FoodService('meals');
    const expected = 'https://www.themealdb.com/api/json/v1/1/search.php?s=teste';
    service.search('s', 'teste');
    expect(global.fetch).toHaveBeenCalledWith(expected);
  });
  test('Fetch para Drink deve ser chamado com os argumentos corretos', () => {
    const service = FoodService('drinks');
    const expected = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=teste';
    service.search('s', 'teste');
    expect(global.fetch).toHaveBeenCalledWith(expected);
  });
  test('Retorno da busca correto', async () => {
    const service = FoodService('meals');
    const data = await service.search('s', 'teste');
    expect(data).toEqual(expectUrlReturnById);
  });
  test('Retorno da busca por id correto', async () => {
    const service = FoodService('meals');
    const data = await service.getById('123');
    expect(data).toEqual(expectUrlReturn);
  });
});
