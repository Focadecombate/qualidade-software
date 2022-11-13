/* 
Bug encontrado com ajuda do jasmine

É necessário manter uma instancia na classe principal para manter que o generator não seja reiniciado a cada chamada
*/

export function* idGenerator() {
  let id = 0;

  while (true) {
    yield (id += 1);
  }
}
